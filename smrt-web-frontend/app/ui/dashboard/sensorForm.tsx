'use client';
// next & react
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
// ui
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FolderArrowDownIcon,
  XMarkIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
// functions & state
import {
  fetchIndividualData,
  updateSensor,
  deleteSensorById,
} from '@/app/functions';
import { useUserArrayStore, usePopupStore } from '@/app/store';
// jsx components
import Popup from './popup';
import NoData from './noData';
import SelectedUsersTagBox from './selectedUserTags';
import PopupUserSelector from './popupUserSelector';
// misc
import withAuth from '@/app/ui/authentication/withAuth';

const AuthSensorForm = withAuth(SensorForm);
export default AuthSensorForm;

function SensorForm() {
  // default loading message
  const loading = 'Loading...';

  // to find path parameter: sensor id
  const regex = /sensors\/(.*?)\/edit/;
  const match = usePathname().match(regex);
  const sensorId: string = match ? match[1] : loading;

  // for backtracking
  const router = useRouter();
  const cancelUrl = `/dashboard/sensors/${sensorId}`;

  const [deviceFormData, setDeviceFormData] = useState({
    sensorName: loading,
    sensorId: loading,
    addressLine1: loading,
    alert: true,
    temperatureThreshold: 0,
  });

  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  // testing
  const { userArray, setUserArray } = useUserArrayStore();

  useEffect(() => {
    if (sensorId != null) {
      // get individual sensor data
      fetchIndividualData(sensorId).then((data) => {
        if (data != null) {
          setDeviceFormData({
            sensorName: data.sensor_name,
            sensorId: data.sensor_id,
            addressLine1: data.location,
            alert: data.alerts_enabled,
            temperatureThreshold: data.threshold_temp,
          });
          // testing
          setUserArray(data.users.data);

          setIsEmpty(false);
        } else {
          // Display popup for error message
          alert('Error fetching sensor data. Please try again later.');
          setIsEmpty(true);
        }
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setDeviceFormData({
      ...deviceFormData,
      [name]: name === 'alert' ? value === 'yes' : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(deviceFormData);

    const update = {
      data: {
        sensor_name: deviceFormData.sensorName,
        sensor_id: deviceFormData.sensorId,
        location: deviceFormData.addressLine1,
        threshold_temp: deviceFormData.temperatureThreshold,
        alerts_enabled: deviceFormData.alert,
        users: userArray.map((user) => user.id),
      },
    };

    // update sensor data
    const success = await updateSensor(update.data);

    if (success) {
      // Display popup for successful update
      alert('Update successful');
      // Redirect to /sensors
      router.push(cancelUrl);
    } else {
      // Display popup for error message
      alert('Error updating sensor');
    }
  };

  // popup
  const [showPopup, setShowPopup] = useState(false);
  const { toggleSelectUsers } = usePopupStore();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const deleteSensor = async () => {
    // delete sensor
    const success = await deleteSensorById(sensorId);

    if (success) {
      // Display popup for successful update
      alert('Sensor deleted');
      // Redirect to /sensors
      router.push('/dashboard/sensors');
    } else {
      // Display popup for error message
      alert('Error deleting sensor');
    }
  };

  // if data failed to be fetched
  if (isEmpty)
    return (
      <Container fluid className="align-items-center bg-gray-200 p-2">
        <Row className="d-flex align-items-center">
          <Col
            lg={11}
            xs={10}
            className="p-6 text-4xl font-semibold text-slate-600"
          >
            Sensor Settings
          </Col>
          <Col lg={1} xs={2} className="text-right">
            <Link
              href={cancelUrl}
              className="rounded-full text-red-500 no-underline"
            >
              <XMarkIcon className="w-12 rounded-full bg-slate-300" />
            </Link>
          </Col>
        </Row>
        <Row className="d-flex align-items-center">{NoData()}</Row>
      </Container>
    );

  return (
    <Container fluid className="align-items-center bg-gray-200 p-2">
      <Row className="align-items-center justify-content-between flex">
        <Col
          lg={11}
          xs={10}
          className="p-6 text-4xl font-semibold text-slate-600"
        >
          Sensor Settings
        </Col>
        <Col
          lg={1}
          xs={2}
          className="justify-content-end flex"
          style={{ width: '50px' }}
        >
          <Link
            href={cancelUrl}
            className="rounded-full text-red-500 no-underline"
          >
            <XMarkIcon className="w-12 rounded-full bg-slate-300 hover:bg-slate-400" />
          </Link>
        </Col>
      </Row>

      <Container fluid className="rows-6 rounded-xl bg-white p-4">
        <Form onSubmit={handleSubmit}>
          <Row className="rounded-xl bg-white pl-2 pt-2">
            <Col lg={6}>
              <Form.Group>
                <Form.Label>Sensor Name</Form.Label>
                <Form.Control
                  id="sensorName"
                  name="sensorName"
                  type="text"
                  placeholder="Enter Name"
                  tabIndex={1}
                  value={deviceFormData.sensorName}
                  onChange={handleChange}
                  style={{ height: '45px', background: '#E2E8F0' }}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group>
                <Form.Label>Sensor ID</Form.Label>
                <div
                  className="sensor-id font-black"
                  style={{ height: '45px', background: '#E2E8F0' }}
                >
                  {deviceFormData.sensorId}
                </div>
              </Form.Group>
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  placeholder="Enter Address"
                  tabIndex={3}
                  value={deviceFormData.addressLine1}
                  onChange={handleChange}
                  style={{ height: '45px', background: '#E2E8F0' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="rounded-xl bg-white pl-2 pr-4 pt-2">
            <Col lg={12}>
              <div className="w-100 mb-10 mt-10 h-1 rounded-md bg-gray-200"></div>
            </Col>
          </Row>

          <Row className="rounded-xl bg-white pl-2">
            <Col lg={6}>
              <Form.Group>
                <Form.Label>Alert</Form.Label>
                <Form.Control
                  id="alert"
                  name="alert"
                  as="select"
                  tabIndex={5}
                  value={deviceFormData.alert ? 'yes' : 'no'}
                  onChange={handleChange}
                  style={{ height: '45px', background: '#E2E8F0' }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group>
                <Form.Label>Temperature Threshold (°C)</Form.Label>
                <Form.Control
                  id="temperatureThreshold"
                  name="temperatureThreshold"
                  type="number"
                  placeholder="Enter Temperature (°C)"
                  tabIndex={6}
                  value={deviceFormData.temperatureThreshold}
                  onChange={handleChange}
                  style={{ height: '45px', background: '#E2E8F0' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="rounded-xl bg-white pl-2 pr-4 pt-2">
            <Col lg={12}>
              <div className="w-100 mb-10 mt-10 h-1 rounded-md bg-gray-200"></div>
            </Col>
          </Row>

          <Row className="rounded-xl bg-white pl-2 pr-4 pt-2">
            <Col lg={12}>
              <div className="d-flex align-items-center mb-2">
                <div>
                  User Notification List:{' '}
                  <span className="font-bold text-slate-500">
                    {userArray.length}
                  </span>
                </div>
                <Col xs="auto" className="p-1 text-white">
                  <Button
                    onClick={toggleSelectUsers}
                    size="sm"
                    variant="light"
                    className="d-flex align-items-center mb-1 ml-1 mt-1"
                    style={{ borderRadius: '50px' }}
                  >
                    <UserPlusIcon className="sort-icon text-blue-500" />
                  </Button>
                </Col>
              </div>
              <div>{SelectedUsersTagBox()}</div>
            </Col>
          </Row>

          <Row className="justify-content-end p-10">
            {/* popup */}
            <Popup show={showPopup} type="change_password">
              <Container>
                <Row>
                  <Col lg={12} className="justify-content-right p-10">
                    <h2 className="text-2xl font-semibold text-slate-600">
                      Are you sure you want to delete sensor {sensorId}?
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={togglePopup}
                      className="mr-2"
                    >
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteSensor}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Popup>

            {/* selected users */}
            <PopupUserSelector></PopupUserSelector>

            {/* delete/save buttons */}
            <Col lg={4} className="justify-content-right flex flex-row p-10">
              <Button variant="danger" onClick={togglePopup} className="mr-2">
                <XMarkIcon className="sort-icon" />
                Delete Sensor
              </Button>
              <Button variant="primary" type="submit">
                <FolderArrowDownIcon className="sort-icon mb-1" />
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}
