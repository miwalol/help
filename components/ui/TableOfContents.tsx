import { TocElement } from '@/app/utils';

export default function TableOfContents({ contents }: {contents: TocElement[]}) {
  if (!contents.length) {
    return <aside className="sticky top-20 hidden max-h-96 min-w-64 max-w-64 overflow-x-hidden md:block"></aside>;
  }

  return (
    <aside className="sticky top-20 ml-8 hidden max-h-96 min-w-64 max-w-64 overflow-x-hidden md:block">
      <span className="mb-1 block font-bold">On this page</span>

      <ul className="space-y-1">
        {contents.map(c => {
          return (
            <li key={c.id} className="truncate">
              <a
                href={`#${c.id}`} title={c.title} className="truncate" style={{ paddingLeft: `${c.level - 2}rem` }}
              >{c.title}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}