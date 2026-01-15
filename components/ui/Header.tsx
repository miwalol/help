import Link from 'next/link';
import miwaWhite from '@/app/assets/miwa-white-48.png';
import Image from 'next/image';
import { SiBluesky, SiDiscord, SiGithub, SiReddit, SiX } from '@icons-pack/react-simple-icons';

export default function Header() {
  return (
    <header className="px-4 py-3 backdrop-blur flex items-center justify-between w-full sticky top-0 z-50 border-b border-border shadow">
      <div>
        <Link href="/" className="flex items-center gap-2 p-1">
          <Image src={miwaWhite} alt="Miwa.lol Logo" width={40} height={40} className="size-10" priority/>
          <span className="text-3xl font-bold">
            Miwa<span className="text-indigo-700">.</span>lol
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://github.com/miwalol" target="_blank"><SiGithub /></a>
        <a href="https://discord.gg/miwa" target="_blank"><SiDiscord /></a>
        <a href="https://x.com/MiwaTeam" target="_blank"><SiX /></a>
        <a href="https://bsky.app/profile/miwa.lol" target="_blank"><SiBluesky /></a>
        <a href="https://www.reddit.com/r/Miwadotlol/" target="_blank"><SiReddit /></a>
      </div>
    </header>
  );
}