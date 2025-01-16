// next and react
import { useEffect } from 'react';
// ui
import { Container, Row, Col } from 'react-bootstrap';
import { XMarkIcon } from '@heroicons/react/24/outline';
// functions and state
import { fetchAlertHist, fetchTotalAlertPages } from '@/app/functions';
import {
  usePopupStore,
  useAlertHistArrayStore,
  useDeviceDataStore,
  usePageNumberStore,
  useLastPageStore,
} from '@/app/store';
// jsx components
import Popup from './popup';
import Pagination from './pagination';
import AlertRow from '@/app/ui/dashboard/alertRow';

export default function PopupSensorAlerts() {
  const showSensorAlerts = usePopupStore((state) => state.showSensorAlerts);
  const toggleSensorAlerts = usePopupStore((state) => state.toggleSensorAlerts);
  const { lastPage, setLastPage } = useLastPageStore();
  const { alertHistory, noAlerts, setNoAlerts, setAlertHistory } =
    useAlertHistArrayStore();
  const { deviceData, setDeviceData } = useDeviceDataStore();
  const { pageNumber, setPageNumber } = usePageNumberStore();

  useEffect(() => {
    const fullPath = window.location.pathname;
    const parts = fullPath.split('/');
    const identifier = parts[parts.length - 1]; // Get the id

    fetchTotalAlertPages(identifier).then((data) => {
      if (data == null) {
        //error fetching data
        console.log('last page is??', data);
        alert('Error fetching alert history. Please try again later.');
      } else if (data.pageCount == 0) {
        setLastPage({ pageCount: 1 });
        console.log('last page is!!', data);
      } else {
        setLastPage(data);
        console.log('last page is', data);
      }
    });

    fetchAlertHist(identifier, pageNumber).then((data) => {
      console.log('pageNumber is:', pageNumber);
      if (data == null) {
        //error fetching data
        alert('Error fetching alert history. Please try again later.');
        setNoAlerts(true);
      } else if (data.length == 0) {
        // data is empty
        setNoAlerts(true);
      } else {
        setNoAlerts(false);
        setAlertHistory(data);
      }
      console.log('???', data);
    });
  }, [pageNumber]);

  return (
    <Popup show={showSensorAlerts} type="notification_list">
      <Container>
        <Row>
          <Col xs={12} className="justify-content-center flex items-center">
            <div className="ml-auto text-xl font-bold">
              {deviceData.sensor_name}
            </div>
            <button
              className="ml-auto w-8 rounded-full text-red-600"
              onClick={toggleSensorAlerts}
            >
              <XMarkIcon className="sort-icon" />
            </button>
          </Col>
          <Row className="justify-center text-base font-semibold text-slate-400">
            {deviceData.sensor_id}
          </Row>
        </Row>
        <Row className="text-xl font-semibold text-black">
          <Col xs={12}>Notifications</Col>
        </Row>
        <Row className="flex w-full border-b-2 border-slate-500">
          <Col xs={4} className="text-lg font-semibold text-slate-600">
            Message
          </Col>
          <Col
            xs={3}
            lg={2}
            className="justify-content-start flex text-lg font-semibold text-slate-600"
          >
            Temp<span className="hidden md:block">erature</span>
          </Col>
          {/* <Col xs={3} lg={2} className='font-semibold text-lg text-slate-600'>
            Threshold
          </Col> */}
          <Col xs={2} lg={2} className="text-lg font-semibold text-slate-600">
            Humidity
          </Col>
        </Row>
        <Row>
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
              return (
                <AlertRow
                  key={index}
                  alert={alert}
                  gray={isGray}
                  type="alert_popup"
                />
              );
            })
          )}
        </Row>
        <Row className="mt-3">
          <Pagination />
        </Row>
      </Container>
    </Popup>
  );
}
