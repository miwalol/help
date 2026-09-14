export interface TocElement {
  title: string;
  id: string;
  level: number;
}

function cleanHeadingText(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function slugify(title: string): string {
  let res = cleanHeadingText(title).toLowerCase();
  res = res.replace(/[<>[\]/:="]/g, '');
  res = res.replace(/[\s()?!,'&.]+/g, '-');
  res = res.replace(/^-+|-+$/g, '');
  return res;
}

export function buildTableOfContents(source: string): TocElement[] {
  const headings: TocElement[] = [];
  const regex = /^(#{1,6})\s+(.+?)\s*$/gm;
  let match;

  while ((match = regex.exec(source)) !== null) {
    const level = match[1].length;
    const title = cleanHeadingText(match[2]);
    if (!title) continue;

    headings.push({ title, id: slugify(title), level });
  }

  return headings;
}
