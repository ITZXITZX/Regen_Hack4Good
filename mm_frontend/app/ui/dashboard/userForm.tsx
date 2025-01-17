'use client';
// next & react
import { useState, useEffect } from 'react';
import Link from 'next/link';
// ui
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FolderArrowDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
// functions & state
import { updateUser } from '@/app/functions';
import { useUserStore, usePopupStore } from '@/app/store';
// jsx components
import NoData from './noData';
import PopupChngPwd from '@/app/ui/dashboard/popupChngPwd';
// misc
import withAuth from '@/app/ui/authentication/withAuth';

const AuthUserForm = withAuth(UserForm);
export default AuthUserForm;

function UserForm() {
  const { userData, setUserData } = useUserStore();
  const { showChngPwd, toggleChngPwd } = usePopupStore();
  const [userFormData, setUserFormData] = useState({
    username: userData.username,
    email: userData.email,
    phone_number: userData.phone_number,
  });

  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (userData.username === 'Loading...') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    setUserFormData({
      username: userData.username,
      email: userData.email,
      phone_number: userData.phone_number,
    });
  }, [userData]);

  const cancelUrl = `/dashboard/sensors`;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Check if the input field is for the phone number
    if (name === 'phone_number') {
      // Ensure it starts with +65 and follows by 8 digits starting with 9
      const phoneNumber = value.replace(/\D/g, ''); // Remove non-digit characters
      let formattedPhoneNumber = `+65${phoneNumber.slice(2)}`; // Append +65 prefix

      // Validate phone number format
      if (
        formattedPhoneNumber.startsWith('+65') &&
        formattedPhoneNumber.length <= 11 &&
        (formattedPhoneNumber[3] == '9' ||
          formattedPhoneNumber[3] == '8' ||
          formattedPhoneNumber[3] == undefined)
      ) {
        setUserFormData((prevFormData) => ({
          ...prevFormData,
          [name]: formattedPhoneNumber,
        }));
      }
    } else {
      setUserFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // user info submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserData({
      ...userData,
      username: userFormData.username,
      email: userFormData.email,
      phone_number: userFormData.phone_number,
    });

    localStorage.setItem(
      'userData',
      JSON.stringify({
        ...userData,
        username: userFormData.username,
        email: userFormData.email,
        phone_number: userFormData.phone_number,
      }),
    );

    const update = {
      username: userFormData.username,
      email: userFormData.email,
      phone_number: userFormData.phone_number,
    };

    const success = await updateUser(userData.id, update);

    if (success) {
      alert('Update user successful');
    } else {
      alert('Error updating user');
    }
  };

  // if user data failed to be fetched
  if (isEmpty)
    return (
      <Container fluid className="align-items-center bg-gray-200 p-2">
        <Row className="d-flex align-items-center">
          <Col
            lg={11}
            xs={10}
            className="p-6 text-4xl font-semibold text-slate-600"
          >
            User Settings
          </Col>
          <Col lg={1} xs={2} className="text-right">
            <Link href={cancelUrl} className="no-underline">
              <div className="circle-button p-4 text-3xl text-red-500">
                <XMarkIcon />
              </div>
            </Link>
          </Col>
        </Row>
        <Row className="d-flex align-items-center">{NoData()}</Row>
      </Container>
    );

  return (
    <Container fluid className="align-items-center bg-gray-200 p-2">
      <Row className="d-flex align-items-center justify-content-between">
        <Col
          lg={11}
          xs={10}
          className="p-6 text-4xl font-semibold text-slate-600"
        >
          User Settings
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
            <XMarkIcon className="w-12 rounded-full bg-slate-300" />
          </Link>
        </Col>
      </Row>

      <Container fluid className="rows-6 rounded-xl bg-white p-4">
        <Form onSubmit={handleSubmit}>
          <Row className="rounded-xl bg-white pl-2 pt-2">
            <Col lg={6} className="mb-3">
              <Form.Group controlId="formUsername">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  tabIndex={1}
                  value={userFormData.username}
                  onChange={handleChange}
                  style={{ height: '44px', background: '#E2E8F0' }}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  name="phone_number"
                  type="text"
                  placeholder="Enter Phone Number"
                  tabIndex={6}
                  value={userFormData.phone_number}
                  onChange={handleChange}
                  style={{ height: '44px', background: '#E2E8F0' }}
                />
              </Form.Group>
            </Col>
            <Col lg={6} className="mt-4">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <div
                  className="sensor-id font-black"
                  style={{ height: '44px', background: '#E2E8F0' }}
                >
                  {userFormData.email}
                </div>
              </Form.Group>
            </Col>
            <Col lg={3} className="mt-5 p-2">
              <Form.Group>
                <Button variant="primary" type="submit" className="h-11 w-full">
                  <FolderArrowDownIcon className="sort-icon" /> Save Changes
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Row className="rounded-xl bg-white pl-2 pr-4 pt-2">
          <Col lg={12}>
            <div className="w-100 mb-10 mt-10 h-1 rounded-md bg-gray-200"></div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={4} className="p-2">
            <Button onClick={toggleChngPwd} className="h-11 w-full">
              Change Password
            </Button>
          </Col>
          <PopupChngPwd />
        </Row>
      </Container>
    </Container>
  );
}
