// next & react
import { useState } from 'react';
// ui
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { XMarkIcon } from '@heroicons/react/24/outline';
// functions & state
import { shortenString } from '@/app/functions';
import { useUserArrayStore } from '@/app/store';

export default function SelectedUsersTagBox() {
  const { userArray, setUserArray } = useUserArrayStore();

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const deleteUser = (id: number) => {
    setUserArray(userArray.filter((user) => user.id !== id));
  };

  return (
    <Container
      style={{ height: '45px', background: '#E2E8F0' }}
      className="rounded-xl"
    >
      <Row className="flex-nowrap overflow-auto">
        {userArray.map((user, index) => (
          <Col
            key={index}
            xs="auto"
            className="p-1"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {hoverIndex === index ? (
              <Button
                variant="light"
                className="d-flex align-items-center justify-content-center m-1 p-2"
                style={{
                  borderRadius: '50px',
                  width: 70,
                  height: 30,
                  backgroundColor: 'white',
                }}
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                <XMarkIcon color="red" className="h-8" />
              </Button>
            ) : (
              <Badge
                pill
                bg="light"
                text="dark"
                className="d-flex align-items-center m-1 p-2"
                style={{ width: 70, height: 30, backgroundColor: 'white' }}
              >
                <Col>{shortenString(user.attributes.username, 8)}</Col>
              </Badge>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
