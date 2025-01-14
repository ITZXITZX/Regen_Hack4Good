'use client';
// next & react
import { useState, useEffect } from 'react';
// ui
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import { EyeIcon } from '@heroicons/react/24/outline';
// functions & state
import {
  formatDateReadable,
  isWithinFiveMinutes,
  fetchIndividualData,
} from '@/app/functions';
import {
  usePopupStore,
  useUserArrayStore,
  useDeviceDataStore,
  useRefreshStore,
} from '@/app/store';
// jsx components
import StatusIndicator from './statusIndicator';
// misc
import { DeviceData } from '@/app/lib/definitions';
import withAuth from '../authentication/withAuth';

export function DataCard2() {
  const apiUrl = process.env.SERVER_ORIGIN;
  const { toggleShowUsers } = usePopupStore();
  const { deviceData, setDeviceData } = useDeviceDataStore();
  const { setUserArray } = useUserArrayStore();

  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const refresh = useRefreshStore((state) => state.refreshState);

  const abovetres: boolean = deviceData.curr_temp >= deviceData.threshold_temp;
  const offline = !isWithinFiveMinutes(deviceData.last_seen);

  useEffect(() => {
    const fullPath = window.location.pathname;
    const parts = fullPath.split('/');
    const identifier = parts[parts.length - 1]; // Get the id
    // fetch individual data
    fetchIndividualData(identifier).then((data) => {
      if (data == null) {
        // error fetching data
        alert('Error fetching sensor data. Please try again later.');
        console.log(data);
        setIsEmpty(true);
      } else {
        console.log(data);
        setIsEmpty(false);
        setDeviceData(data);
        setUserArray(data.users.data);
        console.log('Device Data: ', deviceData);
      }
    });
  }, [refresh]);

  return (
    <Container className="rounded-lg bg-white p-3 no-underline drop-shadow-md">
      <Row>
        <Col
          xs={12}
          className="justify-content-between flex text-4xl font-bold text-slate-500"
        >
          {deviceData.sensor_name}
          <span className="flex h-8 text-lg">
            <StatusIndicator offline={offline} />
          </span>
        </Col>
        <Col xs={12} className="mt-2 px-3 text-sm font-bold text-slate-400">
          {deviceData.sensor_id}
        </Col>
      </Row>
      <Row className="mt-4 px-1 text-sm font-bold">
        <Col xs={6}>
          <Row className="text-base font-normal">
            <Col xs={12}>
              Current<br></br>Temperature
            </Col>
          </Row>
          <Row
            className={clsx('', {
              'text-green-500': !abovetres && !offline,
              'text-red-500': abovetres && !offline,
              'text-slate-300': offline,
            })}
          >
            <Col xs={12}>{deviceData.curr_temp} °C</Col>
          </Row>
        </Col>
        <Col xs={6}>
          <Row className="text-base font-normal">
            <Col xs={12}>
              Temperature<br></br>Threshold
            </Col>
          </Row>
          <Row className="text-md text-slate-600">
            <Col xs={12}>{deviceData.threshold_temp} °C</Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3 px-1 text-sm font-bold">
        <Col xs={6} className="">
          <Row className="text-base font-normal">
            <Col xs={12}>
              Current<br></br>Humidity
            </Col>
          </Row>
          <Row
            className={clsx('text-md', {
              'text-slate-300': offline,
              'text-slate-600': !offline,
            })}
          >
            <Col xs={12}>{deviceData.curr_humidity} %</Col>
          </Row>
        </Col>
        <Col xs={6} className="">
          <Row className="text-base font-normal">
            <Col xs={12}>Location</Col>
          </Row>
          <Row className="text-sm text-slate-600">
            <Col xs={12}>{deviceData.location}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3 px-1 text-sm font-bold">
        <Col xs={6}>
          <Row className="text-base font-normal">
            <Col xs={12}>
              Notification<br></br>List
            </Col>
          </Row>
          <Row className="text-slate-600">
            <Col xs={12}>
              <button
                onClick={toggleShowUsers}
                className="flex justify-start text-blue-500"
              >
                {deviceData.users.data.length}{' '}
                {deviceData.users.data.length == 1 ? 'user' : 'users'}
                <EyeIcon className="sort-icon" />
              </button>
            </Col>
          </Row>
        </Col>
        <Col xs={6} className="">
          <Row className="text-base font-normal">
            <Col xs={12}>Added on</Col>
          </Row>
          <Row className="text-md text-slate-600">
            <Col xs={12}>{formatDateReadable(deviceData.createdAt)}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-1 mt-3 px-1 text-base">
        <Col xs={12}>Last Updated:</Col>
      </Row>
      <Row
        className={clsx(
          'justify-content-start flex px-1 text-sm font-bold text-slate-400',
          {
            'text-slate-300': offline,
            'text-slate-600': !offline,
          },
        )}
      >
        <Col xs={12}>{formatDateReadable(deviceData.last_seen)}</Col>
      </Row>
    </Container>
  );
}

export const AuthDataCard2 = withAuth(DataCard2);
