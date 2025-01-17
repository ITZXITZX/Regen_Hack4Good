// ui
import { Row, Container, Col } from 'react-bootstrap';
import clsx from 'clsx';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function StatusIndicator({ offline }: { offline: boolean }) {
  return (
    <Row
      className={clsx('hidden lg:block', {
        'text-green-500': !offline,
        'text-red-500': offline,
      })}
    >
      <Col className="flex flex-row">
        <FontAwesomeIcon icon={faCircle} className="fa fa-circle mr-1 w-2.5" />
        {!offline ? ' Online' : ' Offline'}
      </Col>
    </Row>
  );
}
