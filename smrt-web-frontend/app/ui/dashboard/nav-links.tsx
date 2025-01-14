'use client';
// next & react
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// ui
import clsx from 'clsx';
import { UserGroupIcon, HomeIcon, WifiIcon } from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Sensors',
    href: '/dashboard/sensors',
    icon: WifiIcon,
    int: 10,
  },
  //{ name: 'Dashboard', href: '/dashboard', icon: HomeIcon, int: 22 },
  //{ name: 'Users', href: '/dashboard/users', icon: UserGroupIcon, int: 15 },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'justify-right flex h-10 grow items-center gap-2 rounded-md text-sm font-semibold text-slate-600 no-underline hover:bg-gray-300 lg:flex-none lg:justify-start lg:p-2 lg:px-3',
              {
                'bg-gray-200': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="ml-2 w-6" />
            <p className="mt-3 hidden lg:block">{link.name}</p>
            <p className="justify-right mt-3"></p>
          </Link>
        );
      })}
    </>
  );
}
