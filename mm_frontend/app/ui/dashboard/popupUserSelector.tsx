// next and react
import { useState, useEffect } from 'react';
// ui
import { Container, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';
import {
  XMarkIcon,
  UserGroupIcon,
  AtSymbolIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
// functions and state
import {
  usePopupStore,
  useSearchStateStore,
  useUserArrayStore,
} from '@/app/store';
import { fetchAllUsers, shortenString } from '@/app/functions';
// jsx components
import Popup from './popup';
import SearchBar from './searchBar';
// misc
import { UserData, relalationalUserData } from '@/app/lib/definitions';

export default function PopupUserSelector() {
  const { showSelectUsers, toggleSelectUsers } = usePopupStore();
  const { userArray, setUserArray } = useUserArrayStore();
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const { searchTerm, setSearchTerm } = useSearchStateStore();

  const handleExit = () => {
    toggleSelectUsers();
    setSearchTerm('');
  };

  useEffect(() => {
    fetchAllUsers().then((data) => {
      setAllUsers(data);
    });
  }, []);

  const handleClick = (addUser: boolean, user: UserData) => {
    const userId = parseInt(user.id);
    if (addUser) {
      // add
      const addedUserData: relalationalUserData = {
        id: userId,
        attributes: {
          username: user.username,
          email: user.email,
          provider: user.provider,
          confirmed: user.confirmed,
          blocked: user.blocked,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          alert_template: user.alert_template,
          phone_number: user.phone_number,
        },
      };
      if (addedUserData != null) setUserArray([...userArray, addedUserData]);
    } else {
      // delete
      setUserArray(userArray.filter((user) => user.id !== userId));
    }
  };

  const isSelected = (user: UserData) => {
    const userId = parseInt(user.id);
    for (var i = 0; i < userArray.length; i++) {
      if (userArray[i].id === userId) {
        return (
          <button
            type="button"
            className="ml-7 flex text-red-500"
            style={{ borderRadius: '50px' }}
            onClick={() => handleClick(false, user)}
          >
            <XMarkIcon className="h-5 w-6" />
          </button>
        );
      }
    }
    return (
      <button
        type="button"
        className="ml-7 flex text-blue-500"
        style={{ borderRadius: '50px' }}
        onClick={() => handleClick(true, user)}
      >
        <UserPlusIcon className="h-5 w-6" />
      </button>
    );
  };

  return (
    <Popup show={showSelectUsers} type="show_users">
      <Container className="mb-4 rounded-md px-4">
        <div className="sticky top-0 z-10 border-b-2 border-slate-600 bg-white px-3">
          <Row className="h-4"></Row>
          <Row className="mb-10 mt-4 h-4 bg-white">
            <Col xs={5}>
              <SearchBar placeholder="Search User/Email" />
            </Col>
            <Col xs={7} className="justify-content-end flex text-blue-500">
              <button onClick={handleExit} type="button">
                Close
              </button>
            </Col>
          </Row>
          <Row>
            <Col xs={4} className="d-flex text-3xl font-bold text-slate-600">
              Users <UserGroupIcon className="ml-2 w-8" />
            </Col>
            <Col xs={4} className="d-flex text-3xl font-bold text-slate-600">
              Email <AtSymbolIcon className="ml-2 w-8" />
            </Col>
            <Col xs={4} className="d-flex text-3xl font-bold text-slate-600">
              Action
            </Col>
          </Row>
        </div>
        <div className="px-3">
          {allUsers
            .filter((user, index) => {
              return searchTerm.toLowerCase() === ''
                ? true
                : user.username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((user, index) => {
              const isGray = index % 2 === 1;
              return (
                <Row
                  key={index}
                  className={clsx('flex py-2 text-base', {
                    'bg-slate-200': isGray,
                  })}
                >
                  <Col xs={4}>
                    {index + 1}. {shortenString(user.username, 20)}
                  </Col>
                  <Col xs={4}>{shortenString(user.email, 20)}</Col>
                  <Col xs={4}>{isSelected(user)}</Col>
                </Row>
              );
            })}
        </div>
      </Container>
    </Popup>
  );
}
