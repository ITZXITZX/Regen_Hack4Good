'use client';
// next & react
import Link from 'next/link';
// ui
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
// functions & state
import { formatDateReadable, isWithinFiveMinutes } from '@/app/functions';
// jsx components
import StatusIndicator from '@/app/ui/dashboard/statusIndicator';
// misc
import { DeviceData } from '@/app/lib/definitions';

interface DataRowProps {
  device: DeviceData;
  gray: boolean;
}

export default function DataRow({ device, gray }: DataRowProps) {
  const abovetres: boolean = device.curr_temp >= device.threshold_temp;
  const offline = !isWithinFiveMinutes(device.last_seen);
  const apiUrl = process.env.SERVER_ORIGIN;

  return (
    <Link
      href={`/dashboard/sensors/${device.sensor_id}`}
      className={clsx(
        'flex h-10 text-xs font-bold text-slate-600 no-underline hover:drop-shadow-xl',
        {
          'bg-slate-100': gray,
          'bg-white': !gray,
        },
      )}
      style={{
        width: '1240px',
        border: abovetres || offline ? '2px solid red' : '',
      }}
    >
      <div className="px-2" style={{ width: '1240px' }}>
        <Row style={{ width: '1240px' }}>
          <Col xs={2} className="content-center">
            {device.sensor_name}
          </Col>
          <Col xs={2} className="content-center">
            {device.sensor_id}
          </Col>
          <Col xs={2} className="content-center">
            {device.location}
          </Col>
          <Col
            xs={3}
            className={clsx('d-flex', {
              'text-green-500': !offline,
              'text-red-500': offline,
            })}
          >
            <span className="w-40 content-center">
              <StatusIndicator offline={offline} />
            </span>
            <span
              className={clsx('content-center', {
                'text-green-500': !abovetres && !offline,
                'text-red-500': abovetres && !offline,
                'text-slate-300': offline,
              })}
            >
              {device.curr_temp + '°'}
            </span>
          </Col>
          <Col xs={3} className="d-flex">
            <span
              className={clsx('w-32 content-center', {
                'text-slate-300': offline,
                'text-slate-500': !offline,
              })}
            >
              {device.curr_humidity}%
            </span>
            <span className="content-center">
              {formatDateReadable(device.last_seen)}
            </span>
          </Col>
        </Row>
      </div>
    </Link>
  );
}
