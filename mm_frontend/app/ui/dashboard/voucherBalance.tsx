'use client';
// next & react
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// functions & state
import { useUserTypeStore } from '@/app/store'
// ui
import clsx from 'clsx';
import { Row } from 'react-bootstrap';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function VoucherBalance() {
  const pathname = usePathname();
  const { isAdmin, setIsAdmin } = useUserTypeStore();
  return (
    <div className="w-48 p-2 border-t-2 border-slate-300">
      <Row className="mx-3 text-md font-bold text-slate-500">
        Voucher Balance:
      </Row>
      <Row className="mx-3 text-xs text-slate-500">Usable:</Row>
      <Row className="text-xl text-slate-600 font-bold justify-center">{"$" + 90} </Row>
      <Row className="mx-3 text-xs text-slate-500">Total: {"$" + 100} </Row>
      <Row className="mx-3 text-xs text-slate-500">Locked: {"$" + 10} </Row>
    </div>
  );
}
