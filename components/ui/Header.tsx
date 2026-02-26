'use client';

import Link from 'next/link';
import miwaWhite from '@/app/assets/miwa-white-48.png';
import Image from 'next/image';
import { SiBluesky, SiDiscord, SiGithub, SiReddit, SiX } from '@icons-pack/react-simple-icons';
import Search from '@/components/ui/Search';
import { useEffect, useRef, useState } from 'react';
import { Menu, SearchIcon, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMac = /Mac|iPod|iPhone|iPad/.test(typeof navigator === 'undefined' ? '' : navigator.platform);
  const pathname = usePathname();

  useEffect(() => {
    const sidebar = document.getElementById('sidebar') as HTMLDivElement|undefined;
    if (!sidebar) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSidebar(sidebar.ariaExpanded === 'true');
    sidebarRef.current = sidebar;
  }, [pathname]);
  useEffect(() => {
    if (!sidebarRef.current) return;
    sidebarRef.current.ariaExpanded = String(showSidebar);
  }, [showSidebar]);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const keyModifier = isMac ? e.metaKey : e.ctrlKey;
      if (keyModifier && e.key?.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearchBox(true);
      }
    };

    addEventListener('keydown', onKeyDown);
    return () => removeEventListener('keydown', onKeyDown);
  }, [isMac]);

  return (
    <>
      <header className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-border px-4 py-2 shadow backdrop-blur">
        {pathname === '/' ?
          <div className="size-6 md:hidden"></div> :
          <button className="md:hidden" onClick={() => setShowSidebar(!showSidebar)}>{showSidebar ? <X/> : <Menu/>}</button>
        }

        <div>
          <Link href="/" className="flex items-center gap-2 p-1">
            <Image src={miwaWhite} alt="Miwa.lol Logo" width={40} height={40} className="size-10" priority/>
            <span className="text-3xl font-bold">Miwa<span className="text-indigo-700">.</span>lol</span>
          </Link>
        </div>

        <div className="relative max-md:hidden">
          <SearchIcon className="pointer-events-none absolute left-3 top-0 flex h-full items-center" />
          <input
            readOnly onClick={() => setShowSearchBox(true)} placeholder="Search..." type="search"
            className="w-48 rounded-xl border border-indigo-800 bg-indigo-950/80 py-2 pl-10 pr-4 outline-none ring-indigo-500/50 transition duration-200 focus:ring-2 md:w-72 lg:w-96"
          />
          {typeof document !== 'undefined' && (
            <div className="absolute right-3 top-0 flex h-full select-none items-center">
              <kbd className="rounded bg-gray-600 px-1 py-0.5 text-xs">{isMac ? '⌘' : 'Ctrl'}+K</kbd>
            </div>
          )}
        </div>
        <button onClick={() => setShowSearchBox(true)} aria-label="Search" className="md:hidden"><SearchIcon /></button>

        <div className="flex items-center gap-4 max-md:hidden">
          <a href="https://github.com/miwalol" target="_blank"><SiGithub /></a>
          <a href="https://discord.gg/miwa" target="_blank"><SiDiscord /></a>
          <a href="https://x.com/MiwaTeam" target="_blank"><SiX /></a>
          <a href="https://bsky.app/profile/miwa.lol" target="_blank"><SiBluesky /></a>
          <a href="https://www.reddit.com/r/Miwadotlol/" target="_blank"><SiReddit /></a>
        </div>
      </header>

      {showSearchBox && <Search setShowSearchBox={setShowSearchBox}/>}
    </>
  );
}