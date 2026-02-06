'use client';

import Link from 'next/link';
import miwaWhite from '@/app/assets/miwa-white-48.png';
import Image from 'next/image';
import { SiBluesky, SiDiscord, SiGithub, SiReddit, SiX } from '@icons-pack/react-simple-icons';
import Search from '@/components/ui/Search';
import { useEffect, useRef, useState } from 'react';
import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';
import { InstantSearch } from 'react-instantsearch';
import { Menu, SearchIcon, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
    limit: 10,
  },
});

export default function Header() {
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement|undefined>(typeof document === 'undefined' ? undefined : document.getElementById('sidebar') as HTMLDivElement);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [isOnMac, setIsOnMac] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!sidebarRef.current) return;
    sidebarRef.current.ariaExpanded = String(showSidebar);
  }, [showSidebar]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (navigator.userAgent.includes('Mac')) setIsOnMac(true);
  }, []);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key?.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearchBox(true);
      }
    };

    addEventListener('keydown', onKeyDown);
    return () => removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <header className="px-4 py-2 backdrop-blur flex items-center justify-between w-full sticky top-0 z-40 border-b border-border shadow">
        {pathname === '/' ?
          <div className="md:hidden size-6"></div> :
          <button className="md:hidden" onClick={() => setShowSidebar(!showSidebar)}>{showSidebar ? <X/> : <Menu/>}</button>
        }

        <div>
          <Link href="/" className="flex items-center gap-2 p-1">
            <Image src={miwaWhite} alt="Miwa.lol Logo" width={40} height={40} className="size-10" priority/>
            <span className="text-3xl font-bold">Miwa<span className="text-indigo-700">.</span>lol</span>
          </Link>
        </div>

        <div className="max-md:hidden relative">
          <input
            readOnly onClick={() => setShowSearchBox(true)} placeholder="Search..."
            className="pl-3 pr-4 w-48 md:w-72 lg:w-96 py-2 outline-none border border-indigo-800 bg-indigo-950/80 rounded-xl transition duration-200 focus:ring-2 ring-indigo-500 ring-opacity-50"
          />
          <div className="absolute right-3 top-0 h-full flex items-center select-none">
            <kbd className="text-xs px-1 py-0.5 rounded bg-gray-600">{isOnMac ? '⌘' : 'CTRL'}+K</kbd>
          </div>
        </div>
        <button onClick={() => setShowSearchBox(true)} aria-label="Search..." className="md:hidden"><SearchIcon /></button>

        <div className="flex items-center gap-4 max-md:hidden">
          <a href="https://github.com/miwalol" target="_blank"><SiGithub /></a>
          <a href="https://discord.gg/miwa" target="_blank"><SiDiscord /></a>
          <a href="https://x.com/MiwaTeam" target="_blank"><SiX /></a>
          <a href="https://bsky.app/profile/miwa.lol" target="_blank"><SiBluesky /></a>
          <a href="https://www.reddit.com/r/Miwadotlol/" target="_blank"><SiReddit /></a>
        </div>
      </header>

      <InstantSearch indexName="miwa_help" searchClient={adapter.searchClient} searchFunction={helper => {
        // Don't make a search if no query is provided
        if (!helper.state.query) return;
        helper.search();
      }}>
        {showSearchBox && <Search setShowSearchBox={setShowSearchBox}/>}
      </InstantSearch>
    </>
  );
}