import React, { useEffect, useState } from 'react';
import { verifyToken } from '../../functions';
import { useRouter } from 'next/navigation';
import { Container, Row , Col } from 'react-bootstrap';

// Utility function to check JWT
const checkAuth = async () => {
  return await verifyToken();
};

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const verifyAuth = async () => {
        const isValid = await checkAuth();
        if (!isValid) {
          router.push('/');
        } else {
          setIsAuthenticated(true);
        }
      };

      verifyAuth();
    }, []);

    if (!isAuthenticated) {
      return (
        <Container className='d-flex justify-content-center align-items-center' style={{ height: '60vh' }}>
          <Row className='justify-content-center'>
            <Col className='text-center'>
              <h1 className='text-2xl'>Loading...</h1>
            </Col>
          </Row>
        </Container>
      );
    }

    return <WrappedComponent {...props} />;
  };

  // Setting a display name for the HOC
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuth.displayName = `withAuth(${wrappedComponentName})`;

  return WithAuth;
};

export default withAuth;
