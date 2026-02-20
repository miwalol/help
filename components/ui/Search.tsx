import { InfiniteHits, SearchBox, useInstantSearch } from 'react-instantsearch';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Search({ setShowSearchBox }: { setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>> }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        setShowSearchBox(false);
      }
    };
    addEventListener('keydown', onKeyDown);

    return () => removeEventListener('keydown', onKeyDown);
  }, [setShowSearchBox]);
  const instantSearch = useInstantSearch();

  return (
    <div className="fixed inset-0 z-50 size-full h-screen overflow-auto bg-gray-500/10 backdrop-blur">
      <button onClick={() => setShowSearchBox(false)} className="absolute right-6 top-6 z-50">
        <X />
      </button>

      <div className="z-50 flex size-full flex-col justify-start bg-gray-800 p-4 md:mx-auto md:my-8 md:h-auto md:w-72 md:justify-center md:rounded-xl lg:w-96">
        <SearchBox classNames={{
          input: 'pl-3 pr-16 py-2 outline-none w-full border border-indigo-800 bg-indigo-950/80 rounded-xl transition duration-200 focus:ring-2 ring-indigo-500 ring-opacity-50',
          form: 'flex items-center gap-2 relative w-10/12 md:w-full mb-4',
          submit: 'absolute right-3',
          reset: 'absolute right-10',
          submitIcon: 'size-4 fill-white',
          resetIcon: 'size-4 fill-white',
        }} placeholder="Search..." autoFocus />

        {!!instantSearch.results.query?.trim() && <>
          <span className="mb-2 block">{instantSearch.results.nbHits} results for {instantSearch.results.query}</span>

          <InfiniteHits showPrevious={false} classNames={{ list: 'space-y-2' }} hitComponent={({ hit }) => {
            const titleHit = (hit._snippetResult!.title as { value: string }).value;
            const contentHit = (hit._snippetResult!.content as { value: string }).value;

            return (
              <Link
                href={hit.path} className="block rounded-xl bg-gray-900 p-2" key={hit.path} prefetch={false}
                onNavigate={() => setShowSearchBox(false)}
              >
                <span className="font-bold" dangerouslySetInnerHTML={{ __html: titleHit }} />
                <p className="max-h-12 overflow-hidden" dangerouslySetInnerHTML={{ __html: contentHit }} />
              </Link>
            );
          }} />
        </>}
      </div>
    </div>
  );
}