import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SearchIcon, X } from 'lucide-react';

interface ResultData {
  url: string;
  sub_results: {
    excerpt: string;
    title: string;
  }[];
}

export default function Search({ setShowSearchBox }: { setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<{
    id: string;
    data(): Promise<ResultData>;
  }[]>([]);
  const [data, setData] = useState<Record<string, ResultData>>({});

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
  useEffect(() => {
    // @ts-ignore
    import(/* webpackIgnore: true */ '/pagefind/pagefind.js').then(m => {
      // @ts-ignore
      window.pagefind = m;
      // @ts-ignore
      window.pagefind.init();
    });
  }, []);
  const handleSearch = async (query: string) => {
    setQuery(query);
    // @ts-ignore
    const search = await window.pagefind.search(query);
    setResults(search.results);
    for (const result of search.results) {
      const resultData = await result.data();
      setData(prev => ({
        ...prev,
        [result.id]: resultData,
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 size-full h-screen overflow-auto bg-gray-500/10 backdrop-blur">
      <button onClick={() => setShowSearchBox(false)} className="absolute right-6 top-6 z-50">
        <X />
      </button>

      <div className="z-50 flex size-full flex-col justify-start bg-gray-800 p-4 md:mx-auto md:my-8 md:h-auto md:w-72 md:justify-center md:rounded-xl lg:w-96">
        <div className="relative w-full">
          <SearchIcon className="pointer-events-none absolute left-3 top-0 flex h-full items-center" />
          <input
            placeholder="Search..." type="search" value={query} onChange={(e) => handleSearch(e.target.value)} autoFocus
            className="w-full rounded-xl border border-indigo-800 bg-indigo-950/80 py-2 pl-10 pr-4 outline-none ring-indigo-500/50 transition duration-200 focus:ring-2"
          />
        </div>

        {!!query.trim() && <>
          <span className="mb-2 block">{results.length} results for {query}</span>

          <div className="space-y-2">
            {results.map(r => {
              const resData = data[r.id];
              if (!resData) return null;
              const result = resData.sub_results[0];
              if (!result) return null;

              return (
                <Link
                  href={resData.url} className="block rounded-xl bg-gray-900 p-2" key={result.title} prefetch={false}
                  onNavigate={() => setShowSearchBox(false)}
                >
                  <span className="font-bold">{result.title}</span>
                  <p className="max-h-12 overflow-hidden" dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                </Link>
              );
            })}
          </div>
        </>}
      </div>
    </div>
  );
}