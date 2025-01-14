'use client';
// next & react
import Link from 'next/link';
// ui
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThermometerThreeQuarters,
  faTint,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
// functions & state
import { formatDateReadable, isWithinFiveMinutes } from '@/app/functions';
// jsx components
import StatusIndicator from './statusIndicator';
// misc
import { DeviceData } from '@/app/lib/definitions';

export default function DataCard({ device }: { device: DeviceData }) {
  const abovetres: boolean = device.curr_temp >= device.threshold_temp;
  const offline = !isWithinFiveMinutes(device.last_seen);
  const apiUrl = process.env.SERVER_ORIGIN;

  return (
    <Link
      href={`/dashboard/sensors/${device.sensor_id}`}
      className={clsx(
        'h-52 w-full rounded-xl bg-white no-underline outline outline-2 hover:drop-shadow-xl',
        {
          'outline-white': !abovetres && !offline,
          'outline-red-400': abovetres || offline,
        },
      )}
    >
      <Container>
        <Row>
          <Col className="col-12 mt-2 flex flex-row justify-between font-bold text-slate-600">
            <Col>{device.sensor_name}</Col>
            <StatusIndicator offline={offline} />
          </Col>
          <Col className="col-12 mb-1 text-xs font-bold text-slate-400">
            {device.sensor_id}
          </Col>
          <Col className="col-12 mb-2 text-sm font-semibold text-slate-400">
            {device.location}
          </Col>
        </Row>
        <Row className="mb-3 divide-x-2 divide-slate-400">
          <Col className="col-6 text-center text-xs font-semibold text-slate-600">
            <FontAwesomeIcon icon={faThermometerThreeQuarters} /> Temperature
            <Col
              className={clsx('text-center text-3xl font-bold', {
                'text-green-500': !abovetres && !offline,
                'text-red-500': abovetres && !offline,
                'text-slate-300': offline,
              })}
            >
              {device.curr_temp + '°'}
            </Col>
          </Col>
          <Col className="col-6 text-center text-xs font-semibold text-slate-600">
            <FontAwesomeIcon icon={faTint} /> Humidity
            <Col
              className={clsx('text-center text-3xl font-bold ', {
                'text-slate-300': offline,
                'text-slate-500': !offline,
              })}
            >
              {device.curr_humidity + '%'}
            </Col>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 mb-1 text-xs text-slate-400">
            Last Updated:
          </Col>
          <Col className="col-12 text-xs font-bold text-slate-400">
            {formatDateReadable(device.last_seen)}
          </Col>
        </Row>
      </Container>
    </Link>
  );
}
