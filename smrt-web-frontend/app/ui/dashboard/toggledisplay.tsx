'use client';
// ui
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueueListIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import '../home.module.css';
// functions & state
import { useDisplayStore } from '@/app/store';

export default function ToggleDisplay() {
  const list = useDisplayStore((state) => state.list);
  const toggleList = useDisplayStore((state) => state.toggleList);
  return (
    <button onClick={toggleList} className="w-22 mr-3 rounded-full">
      <Row className="d-flex justify-content-center rounded-full bg-white p-1">
        <Col
          xs={5}
          style={{ width: '50px' }}
          className={clsx('flex h-8 rounded-full', {
            'bg-blue-400 text-white': list,
            'bg-transparent': !list,
          })}
        >
          <QueueListIcon className="sort-icon" />
        </Col>
        <Col
          xs={5}
          style={{ width: '50px' }}
          className={clsx('flex h-8 rounded-full', {
            'bg-blue-400 text-white': !list,
            'bg-transparent': list,
          })}
        >
          <Squares2X2Icon className="" style={{ width: '50px' }} />
        </Col>
      </Row>
    </button>
  );
}
