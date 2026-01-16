import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import strip from 'strip-markdown';

const processor = remark().use(strip);

interface Doc {
  title: string;
  path: string;
  content: string;
}

function buildPath(filePath: string) {
  return filePath
    .replace(/^\//, '')
    .replace('content', '')
    .replace(/\.mdx$/, '')
    .replace(/\/index$/, '');
}

async function collectDocs(dir: string) {
  const docs: Doc[] = [];

  async function recurse(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await recurse(fullPath);
      } else if (entry.name.endsWith('.mdx')) {
        const file = await fs.readFile(fullPath, 'utf-8');
        const { data: frontmatter, content } = matter(file);
        const result = await processor.process(content);
        const plainContent = String(result);

        docs.push({
          title: frontmatter.title || entry.name.replace(/\.mdx$/, ''),
          path: buildPath(fullPath),
          content: plainContent.trim(),
        });
      }
    }
  }
  await recurse(dir);

  return docs;
}

const apiKey = '';
async function indexDocs(docs: Doc[]) {
  // Clear existing
  await fetch(`https://${process.env.NEXT_PUBLIC_TYPESENSE_HOST}/collections/miwa_help/documents`, {
    method: 'DELETE',
    headers: {
      'X-TYPESENSE-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter_by: 'id: [*]' }),
  });

  // Import as JSONL
  const jsonl = docs.map(d => JSON.stringify(d) + '\n').join('');
  await fetch(`https://${process.env.NEXT_PUBLIC_TYPESENSE_HOST}/collections/miwa_help/documents/import`, {
    method: 'POST',
    headers: {
      'X-TYPESENSE-API-KEY': apiKey,
    },
    body: jsonl,
  }).then(res => res.text()).then(console.log);
  console.log(`Indexed ${docs.length} docs`);
}

(async () => {
  const docs = await collectDocs('content');
  await indexDocs(docs);
})();