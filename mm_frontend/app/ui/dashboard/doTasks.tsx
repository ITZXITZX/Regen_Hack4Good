'use client';
// next & react
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// functions & state
import { useUserTypeStore, useTasksSelectedStore } from '@/app/store'
// ui
import clsx from 'clsx';
import { CheckCircleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import { Row, Col } from 'react-bootstrap';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function DoTasks() {
  const pathname = usePathname();
  const { isAdmin, setIsAdmin } = useUserTypeStore();
  const { tasksSelected, toggleSelected } = useTasksSelectedStore();
  const tasks = [
    { id: 0, name: 'Mop floor', reward: 5, choped: false },
    { id: 1, name: 'Wash dishes', reward: 10, choped: true },
    { id:2, name: 'Wipe window', reward: 5, choped: false },
    { id:3, name: 'Clear trash', reward: 5, choped: false },
  ];
  return (
    <div className="w-48 p-2 border-t-2 border-slate-300">
      <Row className="mx-3 text-md font-bold text-slate-500">Do Tasks:</Row>
      {tasks
        .filter((task) => task !== undefined) // Filter out undefined tasks
        .map((task) => (
          <button
            key={task.name}
            onClick={() => toggleSelected(task.id)}
            className={clsx(
              'justify-right flex h-10 grow items-center gap-2 rounded-md text-sm font-semibold text-slate-600 no-underline hover:bg-gray-300 lg:flex-none lg:justify-start lg:p-2 lg:px-3',
            )}
          >
            {task.choped ? <NoSymbolIcon className="p-2"/> : <CheckCircleIcon className="p-1"/>}
            <p className="mt-3 hidden lg:block">
              {task.name}
            </p>
          </button>
        ))}
    </div>
  );
}
