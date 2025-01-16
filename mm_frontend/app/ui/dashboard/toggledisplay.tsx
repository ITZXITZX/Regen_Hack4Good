'use client';
// ui
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueueListIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import '../home.module.css';
// functions & state
import { useUserTypeStore } from '@/app/store';

export default function ToggleDisplay() {
  const { isAdmin, setIsAdmin } = useUserTypeStore();
  return (
    <button onClick={() => setIsAdmin(!isAdmin)} className="w-22 mr-3 rounded-full">
      <Row className="d-flex justify-content-center rounded-full bg-gray-200 p-1">
        <Col
          xs={5}
          style={{ width: '100px' }}
          className={clsx('flex h-8 rounded-full text-justify', {
            'bg-blue-400 text-white': isAdmin,
            'bg-transparent': !isAdmin,
          })}
        >
          Admin
        </Col>
        <Col
          xs={5}
          style={{ width: '100px' }}
          className={clsx('flex h-8 rounded-full text-justify', {
            'bg-blue-400 text-white': !isAdmin,
            'bg-transparent': isAdmin,
          })}
        >
          Resident
        </Col>
      </Row>
    </button>
  );
}
