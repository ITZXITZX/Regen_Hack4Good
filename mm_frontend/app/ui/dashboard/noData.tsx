// ui
import { Container, Row, Col } from 'react-bootstrap';

export default function NoData() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '60vh' }}
    >
      <Row className="justify-content-center">
        <Col className="text-center">
          <h1 className="text-2xl">No Data Found</h1>
        </Col>
      </Row>
    </Container>
  );
}
