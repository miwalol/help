import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ISidebarItem } from '@/components/Sidebar';

export default function SidebarItem({ item }: { item: ISidebarItem }) {
  const pathname = usePathname();
  const linkClasses = twMerge(
    'p-2 transition-colors hover:bg-gray-500/30 rounded-lg w-full block text-nowrap truncate',
    'aria-current:bg-gray-500',
  );

  if (Array.isArray(item.items)) {
    return (
      <div>
        {item.slug ? (
          <Link href={item.slug as string} className={linkClasses} aria-current={pathname === item.slug} title={item.label}>
            {item.label}
          </Link>
        ) : (
          <span className={twMerge(
            'p-2 transition-colors hover:bg-gray-500/30 rounded-lg w-full block text-nowrap truncate',
          )}>{item.label}</span>
        )}

        <div className="pl-4">
          {item.items.map(item => {
            return <SidebarItem key={item.slug || item.label} item={item} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <Link href={item.slug as string} className={linkClasses} aria-current={pathname === item.slug} title={item.label}>
      {item.label}
    </Link>
  );
}