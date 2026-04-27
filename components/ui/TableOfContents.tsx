import { TocElement } from '@/app/utils';
import BackToTop from './BackToTop';

export default function TableOfContents({ contents }: {contents: TocElement[]}) {
  if (!contents.length) {
    return <aside aria-label="On this page" className="sticky top-20 hidden max-h-[calc(100vh-6rem)] min-w-64 max-w-64 overflow-x-hidden md:block"></aside>;
  }

  return (
    <aside aria-label="On this page" className="sticky top-20 ml-8 hidden max-h-[calc(100vh-6rem)] min-w-64 max-w-64 overflow-x-hidden overflow-y-auto md:block">
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

      <BackToTop />
    </aside>
  );
}