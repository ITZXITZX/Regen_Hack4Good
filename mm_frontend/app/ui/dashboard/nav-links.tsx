'use client';
// next & react
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// functions & state
import { useUserTypeStore } from '@/app/store'
// ui
import clsx from 'clsx';
import { UserGroupIcon, HomeIcon, WifiIcon, ShoppingCartIcon, BanknotesIcon, CheckCircleIcon, PencilIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function NavLinks() {
  const pathname = usePathname();
  const { isAdmin, setIsAdmin } = useUserTypeStore();
  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, int: 22 },
    !isAdmin ? { name: 'Earn Vouchers', href: '/dashboard', icon: BanknotesIcon, int: 15 } : undefined,
    !isAdmin ? { name: 'Buy Products', href: '/dashboard', icon: ShoppingCartIcon, int: 15 } : undefined,
    isAdmin ? { name: 'Approve Tasks', href: '/dashboard', icon: CheckCircleIcon, int: 15 } : undefined,
    isAdmin ? { name: 'Create Tasks', href: '/dashboard', icon: PencilIcon, int: 15 } : undefined,
    isAdmin ? { name: 'Generate Report', href: '/dashboard', icon: DocumentArrowDownIcon, int: 2} : undefined,
  ];
  return (
    <>
      {links.map((link) => {
        if (link == undefined) return;
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
