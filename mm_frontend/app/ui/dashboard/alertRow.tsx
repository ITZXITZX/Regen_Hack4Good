'use client';
// ui
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
// functions & state
import { notifListDateFormat } from '@/app/functions';
// misc
import { alertHistory } from '@/app/lib/definitions';

interface AlertRowProps {
  alert: alertHistory;
  gray: boolean;
  type: string;
}

export default function AlertRow({ alert, gray, type }: AlertRowProps) {
  if (type == 'alert_popup') {
    return (
      <Row
        className={clsx(
          'flex h-12 text-xs font-bold text-slate-600 no-underline',
          {
            'bg-slate-100': gray,
            'bg-white': !gray,
          },
        )}
      >
        <Col xs={4} className="content-center">
          Temperature above threshold<br></br>
          {notifListDateFormat(alert.time)}
        </Col>
        <Col xs={3} lg={2} className="content-center">
          {alert.temp}°C
        </Col>
        {/* <Col xs={3} lg={2} className="content-center">
          200°C
        </Col> */}
        <Col xs={2} lg={2} className="content-center">
          {alert.humidity}%
        </Col>
      </Row>
    );
  } else if (type == 'recent_alerts') {
    return (
      <Row
        className={clsx(
          'justify-content-between flex h-12 text-xs font-bold text-slate-600 no-underline',
          {
            'bg-slate-100': gray,
            'bg-white': !gray,
          },
        )}
      >
        <Col xs={8} className="">
          Temperature above threshold<br></br>
          {notifListDateFormat(alert.time)}
        </Col>
        <Col xs={4} className="">
          Temperature<br></br>
          {alert.temp}
        </Col>
      </Row>
    );
  }
}
