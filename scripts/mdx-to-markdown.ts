/**
 * Converts the MDX sources in `content/` into plain Markdown suitable for LLM consumption:
 * ESM statements are dropped, JSX components are flattened into their Markdown equivalent,
 * and site-relative links are turned into absolute ones.
 */
export interface MdxToMarkdownOptions {
  /** Site origin, without a trailing slash, used to expand site-relative links. */
  baseUrl: string;
  /** Slugs that have a Markdown mirror; links pointing at them get the `.md` suffix. */
  markdownSlugs: ReadonlySet<string>;
}

interface Attributes {
  [name: string]: string | true;
}

interface Element {
  tag: string;
  attributes: Attributes;
  children: string;
  selfClosing: boolean;
  /** Index of the first character after the element. */
  end: number;
}

/** How an element's output is spliced back into the surrounding Markdown. */
type Display = 'block' | 'listItem' | 'inline';

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: '\'',
  nbsp: ' ',
  '#39': '\'',
};

const FENCE = /^[ \t]{0,3}(`{3,}|~{3,})/;
const TAG_START = /^<\/?[A-Za-z][A-Za-z0-9.]*/;
/** Tags that stay part of the surrounding paragraph even when they open a line. */
const INLINE_TAGS = new Set(['b', 'Badge', 'br', 'code', 'em', 'i', 'span', 'strong', 'sub', 'sup', 'u']);

export function mdxToMarkdown(source: string, options: MdxToMarkdownOptions): string {
  return normalize(convert(stripPreambleImports(source), options));
}

/**
 * Drops the `import` statements every content file starts with. Only the preamble is scanned so
 * that `import` lines inside code samples are left untouched.
 */
function stripPreambleImports(source: string): string {
  const lines = source.split('\n');
  let i = 0;

  while (i < lines.length) {
    if (lines[i].trim() === '') {
      i++;
      continue;
    }
    if (!/^import\s/.test(lines[i])) break;

    while (i < lines.length
      && !/from\s+['"][^'"]+['"];?[ \t]*$/.test(lines[i])
      && !/^import\s+['"][^'"]+['"];?[ \t]*$/.test(lines[i])) i++;
    i++;
  }

  return lines.slice(i).join('\n');
}

function convert(source: string, options: MdxToMarkdownOptions): string {
  let out = '';
  let text = '';
  let i = 0;

  const flush = () => {
    out += transformText(text, options);
    text = '';
  };

  while (i < source.length) {
    if (isLineStart(source, i)) {
      const fence = readFence(source, i);
      if (fence) {
        flush();
        out += fence.text;
        i = fence.end;
        continue;
      }
    }

    if (source[i] === '`') {
      const code = readInlineCode(source, i);
      if (code) {
        flush();
        out += code.text;
        i = code.end;
        continue;
      }
    }

    if (source[i] === '<' && TAG_START.test(source.slice(i, i + 40))) {
      const element = readElement(source, i);
      if (element) {
        flush();
        const atLineStart = isOnlyWhitespaceSince(source, i);
        const rendered = render(element, options);
        i = element.end;

        if (rendered === '') {
          // The element carried no text (an icon component): don't leave a double space behind.
          if (out.endsWith(' ') && source[i] === ' ') i++;
          continue;
        }

        out = splice(out, rendered, displayOf(element.tag, atLineStart));
        continue;
      }
    }

    text += source[i];
    i++;
  }

  flush();
  return out;
}

function displayOf(tag: string, atLineStart: boolean): Display {
  if (!atLineStart || INLINE_TAGS.has(tag)) return 'inline';
  if (tag === 'LinkCard' || tag === 'Param') return 'listItem';
  return 'block';
}

function splice(out: string, rendered: string, display: Display): string {
  if (display === 'inline') return out + rendered;

  const trimmed = out.replace(/[ \t]+$/, '');
  if (display === 'listItem') {
    if (trimmed === '' || trimmed.endsWith('\n')) return trimmed + rendered;
    return `${trimmed}\n${rendered}`;
  }

  if (trimmed.trim() === '') return `${rendered}\n\n`;
  return `${trimmed.replace(/\n+$/, '')}\n\n${rendered}\n\n`;
}

function render(element: Element, options: MdxToMarkdownOptions): string {
  const { tag, attributes } = element;
  const children = element.selfClosing ? '' : convert(dedent(element.children), options).trim();

  switch (tag) {
  case 'Aside': {
    const heading = typeof attributes.title === 'string'
      ? attributes.title
      : String(attributes.type ?? 'note').toUpperCase();
    return blockquote(`**${heading}**\n\n${children}`);
  }
  case 'LinkCard': {
    const href = resolveHref(attribute(attributes, 'href'), options);
    const item = `- [${attribute(attributes, 'title')}](${href})`;
    const description = attribute(attributes, 'description');
    return description ? `${item}: ${description}` : item;
  }
  case 'LinkButton':
    return `[${children}](${resolveHref(attribute(attributes, 'href'), options)})`;
  case 'Param': {
    const details = [attribute(attributes, 'type'), attributes.required ? 'required' : '']
      .filter(Boolean)
      .join(', ');
    const name = `\`${attribute(attributes, 'name')}\``;
    return `- ${details ? `${name} (${details})` : name}: ${attribute(attributes, 'description')}`;
  }
  case 'Tab':
    return `**${attribute(attributes, 'label')}**\n\n${children}`;
  case 'Badge':
    return `(${attribute(attributes, 'text')})`;
  case 'sup':
    return `^${children}`;
  case 'br':
    return ' ';
  default:
    // Wrappers (CardGrid, Steps, Tabs, ParamTable, div…) keep their content; icons render nothing.
    return children;
  }
}

function attribute(attributes: Attributes, name: string): string {
  const value = attributes[name];
  return typeof value === 'string' ? value : '';
}

function blockquote(text: string): string {
  return text
    .split('\n')
    .map(line => (line === '' ? '>' : `> ${line}`))
    .join('\n');
}

function readElement(source: string, start: number): Element | null {
  const tag = readTag(source, start);
  if (!tag || tag.closing) return null;

  if (tag.selfClosing) {
    return { tag: tag.name, attributes: tag.attributes, children: '', selfClosing: true, end: tag.end };
  }

  const closing = findClosingTag(source, tag.end, tag.name);
  if (!closing) return null;

  return {
    tag: tag.name,
    attributes: tag.attributes,
    children: source.slice(tag.end, closing.start),
    selfClosing: false,
    end: closing.end,
  };
}

interface Tag {
  name: string;
  attributes: Attributes;
  closing: boolean;
  selfClosing: boolean;
  end: number;
}

/** Reads a single `<tag …>` or `</tag>` token, tolerating attributes spread over several lines. */
function readTag(source: string, start: number): Tag | null {
  const match = source.slice(start, start + 64).match(/^<(\/?)([A-Za-z][A-Za-z0-9.]*)/);
  if (!match) return null;

  let i = start + match[0].length;
  let quote = '';
  let braces = 0;

  while (i < source.length) {
    const char = source[i];

    if (quote !== '') {
      if (char === quote) quote = '';
    } else if (char === '"' || char === '\'') {
      quote = char;
    } else if (char === '{') {
      braces++;
    } else if (char === '}') {
      braces--;
    } else if (char === '>' && braces === 0) {
      const raw = source.slice(start + match[0].length, i);
      const selfClosing = raw.trimEnd().endsWith('/');
      return {
        name: match[2],
        attributes: parseAttributes(selfClosing ? raw.trimEnd().slice(0, -1) : raw),
        closing: match[1] === '/',
        selfClosing,
        end: i + 1,
      };
    }

    i++;
  }

  return null;
}

function findClosingTag(source: string, from: number, name: string): { start: number; end: number } | null {
  let depth = 1;
  let i = from;

  while (i < source.length) {
    const next = source.indexOf('<', i);
    if (next === -1) return null;

    const tag = readTag(source, next);
    if (!tag || tag.name !== name) {
      i = next + 1;
      continue;
    }

    if (tag.closing) {
      depth--;
      if (depth === 0) return { start: next, end: tag.end };
    } else if (!tag.selfClosing) {
      depth++;
    }

    i = tag.end;
  }

  return null;
}

function parseAttributes(raw: string): Attributes {
  const attributes: Attributes = {};
  const pattern = /([A-Za-z_][A-Za-z0-9_:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g;

  for (const [, name, double, single, expression] of raw.matchAll(pattern)) {
    const value = double ?? single ?? expression;
    attributes[name] = value === undefined ? true : value;
  }

  return attributes;
}

function readFence(source: string, start: number): { text: string; end: number } | null {
  const lineEnd = indexOfLineEnd(source, start);
  const match = source.slice(start, lineEnd).match(FENCE);
  if (!match) return null;

  const marker = match[1];
  const closing = new RegExp(`^[ \\t]{0,3}\\${marker[0]}{${marker.length},}[ \\t]*$`);
  let i = lineEnd;

  while (i < source.length) {
    const nextLineEnd = indexOfLineEnd(source, i + 1);
    const line = source.slice(i + 1, nextLineEnd);
    i = nextLineEnd;
    if (closing.test(line)) break;
  }

  return { text: source.slice(start, i), end: i };
}

function readInlineCode(source: string, start: number): { text: string; end: number } | null {
  const run = source.slice(start).match(/^`+/)![0];
  const closing = source.indexOf(run, start + run.length);
  if (closing === -1) return null;

  const end = closing + run.length;
  return { text: source.slice(start, end), end };
}

function transformText(text: string, options: MdxToMarkdownOptions): string {
  if (text === '') return text;

  return decodeEntities(text)
    // Images are bundled by Next and have no stable public URL, so only the caption survives.
    .replace(/!\[([^\]]*)]\([^)]*\)/g, (_match, alt: string) => (alt ? `*(Image: ${alt})*` : '*(Image)*'))
    .replace(
      /\[([^\]]*)]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g,
      (_match, label: string, target: string, title: string) => `[${label}](${resolveHref(target, options)}${title})`,
    );
}

/** Expands a site-relative link, preferring the Markdown mirror when the target has one. */
function resolveHref(href: string, options: MdxToMarkdownOptions): string {
  if (!href.startsWith('/')) return href;

  const hashIndex = href.indexOf('#');
  const pathname = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex);
  const slug = pathname.replace(/\/+$/, '');

  if (options.markdownSlugs.has(slug)) return `${options.baseUrl}${slug}.md${hash}`;
  return `${options.baseUrl}${pathname}${hash}`;
}

function decodeEntities(text: string): string {
  return text.replace(/&(amp|lt|gt|quot|apos|nbsp|#39);/g, (match, name: string) => ENTITIES[name] ?? match);
}

function dedent(text: string): string {
  const lines = text.split('\n');
  const indents = lines
    .filter(line => line.trim() !== '')
    .map(line => line.match(/^[ \t]*/)![0].length);
  if (indents.length === 0) return text;

  const common = Math.min(...indents);
  return lines.map(line => line.slice(common)).join('\n');
}

function normalize(text: string): string {
  const lines = text.split('\n');
  const out: string[] = [];
  let marker = '';
  let blanks = 0;

  for (const raw of lines) {
    const line = raw.replace(/[ \t]+$/, '');
    const fence = line.match(FENCE);

    if (fence) {
      if (marker === '') marker = fence[1][0];
      else if (fence[1][0] === marker) marker = '';
    }

    if (marker === '' && line === '') {
      blanks++;
      if (blanks > 1) continue;
    } else {
      blanks = 0;
    }

    out.push(marker === '' ? tidyListItem(line) : line);
  }

  return `${out.join('\n').trim()}\n`;
}

/** Cleans up list items whose leading icon component was dropped. */
function tidyListItem(line: string): string {
  return line
    .replace(/^(\s*(?:[*+-]|\d+\.))\s+-\s+/, '$1 ')
    .replace(/^(\s*(?:[*+-]|\d+\.))\s{2,}/, '$1 ');
}

function isLineStart(source: string, index: number): boolean {
  return index === 0 || source[index - 1] === '\n';
}

function isOnlyWhitespaceSince(source: string, index: number): boolean {
  for (let i = index - 1; i >= 0; i--) {
    if (source[i] === '\n') return true;
    if (source[i] !== ' ' && source[i] !== '\t') return false;
  }
  return true;
}

function indexOfLineEnd(source: string, from: number): number {
  const index = source.indexOf('\n', from);
  return index === -1 ? source.length : index;
}
