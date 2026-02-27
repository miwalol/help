import miwaWhite from '@/app/assets/miwa-white-48.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-between gap-4 bg-black px-2 py-4 max-md:flex-col-reverse sm:px-16 md:px-24 lg:px-32 xl:py-6 2xl:px-96">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Image src={miwaWhite} alt="Miwa.lol Logo" width={32} height={32} />

          <span className="text-2xl font-bold">
              Miwa<span className="text-indigo-700">.</span>lol
          </span>
        </div>

        <p className="mb-12">Create your own space that reflects who you are.</p>
          
        <span className="text-sm text-white">Copyright &copy; {new Date().getFullYear()} Miwa.lol. All rights reserved.</span>
      </div>

      <div className="flex flex-wrap gap-3.5 xl:gap-12">
        <div className="flex flex-col gap-2 text-gray-400">
          <span className="font-semibold text-white">Navigation</span>
          <Link href="/" className="transition duration-100 hover:text-white">Main Help</Link>
          <Link href="/developers/" className="transition duration-100 hover:text-white">Developers</Link>
        </div>

        <div className="flex flex-col gap-2 text-gray-400">
          <span className="font-semibold text-white">Legal</span>
          <a href="https://miwa.lol/terms" target="_blank" className="transition duration-100 hover:text-white">Terms of Service</a>
          <a href="https://miwa.lol/privacy" target="_blank" className="transition duration-100 hover:text-white">Privacy Policy</a>
        </div>

      </div>
    </footer>
  );
}