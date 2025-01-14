'use client';
// ui
import { Container, Row, Col } from 'react-bootstrap';
import { EyeIcon } from '@heroicons/react/24/outline';
// functions and state
import {
  usePopupStore,
  useAlertHistArrayStore,
  useRefreshStore,
} from '@/app/store';
// jsx components
import AlertRow from './alertRow';

export default function NotificationList() {
  const refresh = useRefreshStore((state) => state.refreshState);
  const { showSensorAlerts, toggleSensorAlerts } = usePopupStore();
  const { alertHistory, noAlerts } = useAlertHistArrayStore();

  return (
    <Container className="rounded-lg bg-white p-3 drop-shadow-md">
      <Row className="justify-content-between flex text-lg font-semibold text-slate-500">
        <Col xs={6}>Notifications</Col>
        <Col xs={6} className="justify-content-end flex">
          <button
            className="text-blue-500"
            onClick={() => {
              toggleSensorAlerts();
              console.log(showSensorAlerts);
            }}
          >
            View All
            <EyeIcon className="sort-icon" />
          </button>
        </Col>
      </Row>
      {noAlerts ? (
        <Container className="mt-2 h-80">
          <Row className="align-items-center h-full flex-nowrap text-2xl font-semibold text-slate-500">
            <Col xs={12} className="justify-content-center flex">
              No Notifications
            </Col>
          </Row>
        </Container>
      ) : (
        alertHistory.map((alert, index) => {
          const isGray = index % 2 === 1;
          if (index <= 6) {
            return (
              <AlertRow
                key={index}
                alert={alert}
                gray={isGray}
                type="recent_alerts"
              />
            );
          } else {
            return;
          }
        })
      )}
    </Container>
  );
}
