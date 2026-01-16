import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ISidebarItem } from '@/components/Sidebar';

export default function SidebarItem({ item }: { item: ISidebarItem }) {
  const pathname = usePathname();
  const linkClasses = twMerge(
    'px-3 py-1.5 transition-colors hover:bg-gray-500/30 rounded-lg w-full flex items-center gap-1.5 text-nowrap truncate mb-1',
    'aria-current:bg-gray-500',
  );
  const isCurrent = pathname === item.slug || pathname === item.slug + '/';

  if (Array.isArray(item.items)) {
    return (
      <div>
        {item.slug ? (
          <Link href={item.slug as string} className={linkClasses} aria-current={isCurrent} title={item.label}>
            <div>{item.icon && <item.icon/>}</div>

            <span className="truncate">{item.label}</span>
          </Link>
        ) : (
          <div className={linkClasses}>
            <div>{item.icon && <item.icon/>}</div>

            <span className="truncate">{item.label}</span>
          </div>
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
    <Link href={item.slug as string} className={linkClasses} aria-current={isCurrent} title={item.label}>
      <div>{item.icon && <item.icon/>}</div>

      <span className="truncate">{item.label}</span>
    </Link>
  );
}