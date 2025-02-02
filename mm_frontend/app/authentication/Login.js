'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../functions';
import ToggleDisplay from '../ui/dashboard/toggledisplay';

const Login = () => {
  const userRef = useRef('');
  const errRef = useRef();
  const router = useRouter();

  // Username and Password states
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [valid, setValid] = useState(true);

  // Role selection state
  const [role, setRole] = useState('resident'); // No type annotation needed for JavaScript


  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve user data based on role
    const userData = await login(user, pwd);

    if (userData) {
      setValid(true);
      localStorage.setItem('userData', JSON.stringify(userData));

      // Check if role matches
      if (userData.role === role) {
        if (role === 'admin') {
          router.push('/dashboard/admin'); // Redirect to admin page
        } else if (role === 'resident') {
          router.push('/dashboard/resident'); // Redirect to resident page
        }
      } else {
        setValid(false); // Role mismatch error
      }
    } else {
      setValid(false);
    }
  };

  return (
    <Container className="border-1 rounded-xl shadow-md">
      <Form onSubmit={handleSubmit} className="p-5">
        <Row className="mb-4 justify-center">
          <Col lg={6} className="flex items-center justify-center">
            <Image
              src="/muhammadiyah_logo.png"
              width={200}
              height={200}
              className="p-1 md:block"
              alt="Muhammadiyah logo"
            />
          </Col>
        </Row>
        {/* Role Selection */}
        <ToggleDisplay setRole={setRole} />

        {/* Username and Password Form */}
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className="d-block text-left">Username:</Form.Label>
              <Form.Control
                type="text"
                id="user"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                placeholder="Enter Username"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className="d-block text-left">Password:</Form.Label>
              <Form.Control
                type="password"
                id="pwd"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="Enter Password"
              />
              <Form.Text
                className="d-block text-left"
                style={{ visibility: pwd && !valid ? 'visible' : 'hidden', marginTop: '0.5em' }}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                Error invalid username or password.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" rounded="true">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;


// 'use client';
// // next & react
// import Image from 'next/image';
// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// // ui
// import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // functions & state
// import { login } from '../functions'; // Ensure this path is correct
// import ToggleDisplay from '../ui/dashboard/toggledisplay';

// const Login = () => {
//   const userRef = useRef('');
//   const errRef = useRef();
//   const router = useRouter();

//   // username
//   const [user, setUser] = useState('');
//   const [userFocus, setUserFocus] = useState(false); // whether we have focus on the input field

//   // password
//   const [pwd, setPwd] = useState('');
//   const [valid, setValid] = useState(true);
//   const [pwdFocus, setPwdFocus] = useState(false);

//   useEffect(() => {
//     userRef.current.focus(); // only happens when component mounts
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // retrieve user data
//     const userData = await login(user, pwd);
  
//     if (userData) {
//       setValid(true);
//       localStorage.setItem('userData', JSON.stringify(userData));
  
//       // Redirect based on role
//       if (userData.role === 'admin') {
//         router.push('/dashboard/admin'); // Redirect to admin page
//       } else if (userData.role === 'resident') {
//         router.push('/dashboard/resident'); // Redirect to resident page
//       }
//     } else {
//       setValid(false);
//     }
//   };

//   return (
//     <Container className="border-1 rounded-xl shadow-md">
//       <Form onSubmit={handleSubmit} className="p-5">
//         <Row className="mb-4 justify-center">
//           <Col lg={6} className="flex items-center justify-center">
//             <Image
//               src="/muhammadiyah_logo.png"
//               width={200}
//               height={200}
//               className="p-1 md:block"
//               alt="Muhammadiyah logo"
//             />
//           </Col>
//         </Row>
//         <ToggleDisplay/>

//         {/* Username portion */}
//         <Row className="mb-3">
//           <Col>
//             <Form.Group>
//               <Form.Label className="d-block text-left">
//                 Username:
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 id="user"
//                 ref={userRef}
//                 autoComplete="off"
//                 onChange={(e) => setUser(e.target.value)}
//                 value={user}
//                 required
//                 aria-describedby="uidnote"
//                 onFocus={() => setUserFocus(true)}
//                 onBlur={() => setUserFocus(false)}
//                 placeholder="Enter Username"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Password Portion */}
//         <Row className="mb-3">
//           <Col>
//             <Form.Group>
//               <Form.Label className="d-block text-left">Password:</Form.Label>
//               <Form.Control
//                 type="password"
//                 id="pwd"
//                 autoComplete="off"
//                 onChange={(e) => setPwd(e.target.value)}
//                 value={pwd}
//                 required
//                 aria-describedby="pwdnote"
//                 onFocus={() => setPwdFocus(true)}
//                 onBlur={() => setPwdFocus(false)}
//                 placeholder="Enter Password"
//               />
//               <Form.Text
//                 id="pwdnote"
//                 className="d-block text-left"
//                 style={{
//                   visibility: pwd && !valid ? 'visible' : 'hidden',
//                   marginTop: '0.5em',
//                 }}
//               >
//                 <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
//                 Error invalid username or password.
//               </Form.Text>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Button variant="primary" type="submit" rounded="true">
//           Login
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default Login;
