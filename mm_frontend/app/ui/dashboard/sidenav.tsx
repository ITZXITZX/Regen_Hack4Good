// next & react
import Link from 'next/link';
import Image from 'next/image';
// ui
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// jsx components
import NavLinks from '@/app/ui/dashboard/nav-links';
import UserProfile from '@/app/ui/dashboard/userProfile';

export default function SideNav() {
  return (
    <Container className="h-screen bg-white drop-shadow-lg">
      <Row className="d-flex justify-content-between h-full flex-col">
        <Col xs={12} className="mb-5">
          <Link href="/">
            <Image
              src="/muhammadiyah_logo.png"
              width={300}
              height={100}
              className="mb-4 hidden p-4 lg:block"
              alt="mm"
            />
          </Link>
          <NavLinks />
        </Col>
        <Col xs={12} className="justify-content-center mb-4 flex">
          <UserProfile />
        </Col>
      </Row>
    </Container>
  );
}
