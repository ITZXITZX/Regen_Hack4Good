'use client';
// next & react
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// ui
import {
  BellAlertIcon,
  PencilSquareIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// functions & state
import {
  fetchSensorHist,
  getCurrentDate,
  changeDateFormat,
  aggregateData,
} from '@/app/functions';
import {
  useRefreshStore,
  useDateRangeStore,
  useSensorHistStore,
  useDeviceDataStore,
  useIsEmptyStore,
} from '@/app/store';
// jsx components
import NoData from './noData';
import PrintReportButton from './printReportButton';
import RefreshButton from './refreshButton';
import { AuthDataCard2, DataCard2 } from './dataCard2';
import NotificationList from './notificationList';
import PopupSensorAlerts from './popupSensorAlerts';
import PopupUserList from './popupUserList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TempBarGraph } from '@/app/ui/graphs/tempChart';
import { HumidityBarGraph } from '@/app/ui/graphs/humidityChart';
// misc
import { addDays } from 'date-fns';
import { deviceHistory } from '@/app/lib/definitions';
import withAuth from '@/app/ui/authentication/withAuth';

export default function SensorDetail() {
  const router = useRouter();
  // to find path parameter: sensor id (for page reload)
  const links = usePathname().split('/');
  const sensorId = links[links.length - 1];

  const { sensorHist, setSensorHist } = useSensorHistStore();
  const { deviceData } = useDeviceDataStore();

  const refresh = useRefreshStore((state) => state.refreshState);
  const [sensorDate, setSensorDate] = useState(getCurrentDate());
  const { isEmpty, setIsEmpty } = useIsEmptyStore();
  //datepicker with range, dateRange[0] is start date, dateRange[1] is end date
  const { dateRange, setDateRange } = useDateRangeStore();

  //Temperature chart
  const tempChartRef = useRef<any>(null);

  const handleEditClick = () => {
    router.push(`/dashboard/sensors/${sensorId}/edit`); // Replace with your URL
  };

  useEffect(() => {
    console.log('current date range is', dateRange);
    const fullPath = window.location.pathname;
    const parts = fullPath.split('/');
    const identifier = parts[parts.length - 1]; // Get the id

    //console.log("Sensor Date: ", sensorDate);
    fetchSensorHist(
      identifier,
      changeDateFormat(dateRange[0]),
      changeDateFormat(dateRange[1]),
    ).then((data: deviceHistory[] | null) => {
      if (data == null) {
        // error fetching data
        alert('Error fetching sensor history data. Please try again later.');
        if (!isEmpty)
          alert('Error fetching sensor history data. Please try again later.');
      } else {
        const modifiedData: deviceHistory[] = data.map((entry) => ({
          ...entry,
          time: entry.time, // Assuming time is already in the correct string format
        }));

        // Aggregate the data
        const aggregatedData = aggregateData(modifiedData);

        setSensorHist(aggregatedData);
      }
    });
  }, [sensorDate, refresh, dateRange]);

  const handleDatePick = () => {
    //setStartDate(date);
    dateRange !== null ? setSensorDate(changeDateFormat(dateRange[0])) : 'null';
    console.log('selected date is: ', dateRange);
  };

  // for max date
  const maxDate = dateRange[0] ? addDays(dateRange[0], 7) : null;

  // if data failed to be fetched
  if (isEmpty)
    return (
      <Container>
        <Row className="justify-content-md-between pt-8">
          <Col lg={8} className="text-3xl font-bold text-slate-500">
            <Link href="/dashboard/sensors">Sensors</Link> / Detail
          </Col>
        </Row>
        <Row className="justify-content-md-between">{NoData()}</Row>
      </Container>
    );

  // prevent html from loading before deviceData is ready
  if (deviceData.users == null) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-2">
      <Row className="d-flex justify-content-end mb-3 px-3">
        <Col
          xs={1}
          className="d-flex justify-content-end"
          style={{ width: '70px', height: '40px' }}
        >
          <RefreshButton />
        </Col>
      </Row>
      <Row className="justify-content-md-between px-3">
        <Col xs={4} lg={7} className="text-3xl font-bold text-slate-500">
          <Link href="/dashboard/sensors">Sensors</Link> / Detail
        </Col>
        <Col xs={8} lg={5} className="justify-content-end flex">
          <PrintReportButton id={sensorId} />
          <button
            onClick={handleEditClick}
            className="border-1 h-10 w-36 rounded-md border-blue-500 bg-white font-semibold text-blue-500 no-underline"
          >
            <PencilSquareIcon className="sort-icon" />
            Edit
          </button>
        </Col>
      </Row>
      {/*For lg and above*/}
      <Row className="mt-3 flex-nowrap divide-x-2 divide-slate-400 px-3">
        <Col xs={3} md={6} lg={5} xl={4} className="hidden lg:block">
          <Row className="mb-3 px-2">
            <DataCard2 />
          </Row>
          <Row className="px-2">
            <NotificationList />
          </Row>
        </Col>
        <Col xs={9} md={8} lg={7} xl={8} className="hidden lg:block">
          <Row className="mb-2">
            <Col xs={12}>
              <DatePicker
                icon={<CalendarIcon />}
                showIcon
                popperPlacement="bottom-start"
                className="ml-1 rounded-xl border-transparent shadow-md hover:border-black"
                selectsRange={true}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={(update) => {
                  setDateRange(update);
                  handleDatePick();
                }}
                isClearable={true}
                maxDate={maxDate}
              />
            </Col>
          </Row>
          <Row className="justify-content-end mb-3 flex h-96 rounded-lg">
            <Col xs={12} className="h-full">
              <TempBarGraph history={sensorHist} range={dateRange} />
            </Col>
          </Row>
          <Row className="h-96 rounded-lg">
            <Col xs={12} className="h-full">
              <HumidityBarGraph history={sensorHist} range={dateRange} />
            </Col>
          </Row>
        </Col>
      </Row>

      {/*For smaller than lg to md size*/}
      <Row className="mt-3 divide-slate-400 md:divide-x-2">
        <Col xs={12} md={6} className="block lg:hidden">
          <DataCard2 />
        </Col>
        <Col xs={12} className="block h-4 bg-slate-200 md:hidden"></Col>
        <Col xs={12} md={6} className="block lg:hidden">
          <NotificationList />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} className="block lg:hidden">
          <Row className="mb-2">
            <Col xs={12}>
              <DatePicker
                icon={<CalendarIcon />}
                showIcon
                popperPlacement="bottom-start"
                className="ml-1 rounded-xl border-transparent shadow-md hover:border-black"
                selectsRange={true}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={(update) => {
                  setDateRange(update);
                  handleDatePick();
                }}
                isClearable={true}
                maxDate={maxDate}
              />
            </Col>
          </Row>
          <Row className="justify-content-end mb-3 flex h-96 rounded-lg">
            <Col xs={12} className="h-full">
              <TempBarGraph history={sensorHist} range={dateRange} />
            </Col>
          </Row>
          <Row className="h-96 rounded-lg">
            <Col xs={12} className="h-full">
              <HumidityBarGraph history={sensorHist} range={dateRange} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="px-3">
        <Col xs={12} className="text-2xl text-gray-400"></Col>
      </Row>
      <PopupSensorAlerts />
      <PopupUserList />
    </Container>
  );
}
