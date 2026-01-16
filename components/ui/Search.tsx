import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';
import Link from 'next/link';
import React from 'react';

const adapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY!,
    nodes: [{
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
      port: 443,
      path: '',
      protocol: 'https',
    }],
    cacheSearchResultsForSeconds: 5 * 60, // Cache for 5 minutes
    sendApiKeyAsQueryParam: false,
  },
  additionalSearchParameters: {
    query_by: 'title,content',
    include_fields: 'title,content,path',
    enable_analytics: true,
    limit: 5,
  },
});
const searchClient = adapter.searchClient;

export default function Search({ setShowSearchBox }: { setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="absolute inset-0 z-50 backdrop-blur bg-gray-500/10 size-full">
      <InstantSearch indexName="miwa_help" searchClient={searchClient}>
        <div className="flex flex-col justify-center p-8 w-48 md:w-72 lg:w-96 mx-auto">
          <SearchBox classNames={{
            input: 'pl-3 pr-16 py-2 outline-none w-full border border-indigo-800 bg-indigo-950/80 rounded-xl transition duration-200 focus:ring-2 ring-indigo-500 ring-opacity-50',
            form: 'flex items-center gap-2 relative w-full',
            submit: 'absolute right-3',
            reset: 'absolute right-10',
            submitIcon: 'size-4 fill-white',
            resetIcon: 'size-4 fill-white',
          }} placeholder="Search..." autoFocus />

          <Hits hitComponent={({ hit }) => {
            const titleHit = (hit._snippetResult!.title as { value: string }).value;
            const contentHit = (hit._snippetResult!.content as { value: string }).value;

            return (
              <Link
                href={hit.path} className="p-2 bg-gray-800 block" key={hit.path} prefetch={false}
                onNavigate={() => setShowSearchBox(false)}
              >
                <span className="font-bold" dangerouslySetInnerHTML={{ __html: titleHit }} />
                <p className="overflow-hidden max-h-12" dangerouslySetInnerHTML={{ __html: contentHit }} />
              </Link>
            );
          }} />
        </div>
      </InstantSearch>
    </div>
  );
}