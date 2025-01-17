'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Authenticate from './authentication/authenticate';

export default function Page() {
  return (
    <Container>
      <Authenticate />
    </Container>
  );
}
