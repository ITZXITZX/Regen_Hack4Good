import { Container, Button, Row, Col, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DeviceData } from "@/app/lib/definitions";
import Link from 'next/link';

export default function Page() {
    return (
        <Container>
            <Row>
                <Col md={6} lg={6} className="justify-content-center rounded-full bg-white outline-2 border-blue-200 p-2">
                    <Link href={`/dashboard`}></Link>
                </Col>
                <Col md={6} lg={6} className="justify-content-center rounded-full bg-white outline-2 outline-gray-200 p-2">
                </Col>
            </Row>
        </Container>
    );
}
