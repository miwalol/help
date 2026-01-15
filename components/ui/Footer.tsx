import miwaWhite from '@/app/assets/miwa-white-48.png';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="container mx-auto py-4 px-2 flex items-center">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src={miwaWhite} alt="Miwa.lol Logo" width={32} height={32} />

            <span className="text-2xl font-bold">
              Miwa<span className="text-indigo-700">.</span>lol
            </span>
          </div>

          <p className="mb-12">Create your own space that reflects who you are.</p>
          
          <span className="text-sm text-white">Copyright &copy; {new Date().getFullYear()} Miwa.lol. All rights reserved.</span>
        </div>

        <div></div>
      </div>
    </div>
  );
}