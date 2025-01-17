// ui
import { Container, Row, Col } from 'react-bootstrap';
import {
  XMarkIcon,
  UserGroupIcon,
  AtSymbolIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
// functions & state
import { shortenString } from '@/app/functions';
import { usePopupStore, useUserArrayStore } from '@/app/store';
// jsx components
import Popup from './popup';

export default function PopupUserList() {
  const { showUsers, toggleShowUsers } = usePopupStore();
  const { userArray } = useUserArrayStore();

  return (
    <Popup show={showUsers} type="show_users">
      <Container className="mb-4 rounded-md px-4">
        <div className="sticky top-0 z-10">
          <Row className="h-4 bg-white"></Row>
          <Row className="justify-content-between flex h-12 border-b-2 border-slate-600 bg-white">
            <Col xs={6} className="d-flex text-3xl font-bold text-slate-600">
              Users <UserGroupIcon className="ml-2 w-8" />
            </Col>
            <Col
              xs={6}
              className="d-flex justify-content-between text-3xl font-bold text-slate-600"
            >
              <span className="flex">
                Email <AtSymbolIcon className="ml-2 w-8" />
              </span>
              <button
                onClick={toggleShowUsers}
                type="button"
                className="text-red-500"
              >
                <XMarkIcon className="w-7" />
              </button>
            </Col>
          </Row>
        </div>
        {userArray.map((user, index) => {
          const isGray = index % 2 === 1;
          return (
            <Row
              key={index}
              className={clsx('mt-2 flex text-base', {
                'bg-slate-100': isGray,
              })}
            >
              <Col xs={6}>
                {index + 1}. {shortenString(user.attributes.username, 20)}
              </Col>
              <Col xs={6}>{shortenString(user.attributes.email, 20)}</Col>
            </Row>
          );
        })}
      </Container>
    </Popup>
  );
}
