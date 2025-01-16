'use client';
// next & react
import { useState, useEffect, useRef } from 'react';
// ui
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// declare requirements for username and password
const specialChar = '!@#$%';
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef('');
  const errRef = useRef();
  // username
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false); // whether name validates or not
  const [userFocus, setUserFocus] = useState(false); // whether we have focus on the input field
  // password
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  // confirm password
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); //successful submition of form or not

  useEffect(() => {
    userRef.current.focus(); // only happens when component mounts
  }, []);

  // set validity of username and store user state
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  // set validity of PWD
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.prevent.default();
    //validation check to prevent hacks
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    console.log(user, pwd);
    setSuccess(true);
  };

  return (
    <Container>
      <p
        ref={errRef}
        className={errMsg ? 'errMsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Form onSubmit={handleSubmit}>
        {/* Username portion */}
        <Row>
          <Col>
            <Form.Group controlId="formUsername">
              <Form.Label className="d-block text-left">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    visibility: validName ? 'visible' : 'hidden',
                    top: '0',
                    right: '0',
                  }}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    visibility: validName || !user ? 'hidden' : 'visible',
                    top: '0',
                    right: '0',
                  }}
                />
              </Form.Label>
              <Form.Control
                type="text"
                id="user"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? 'false' : true}
                aria-describedby="pidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="Enter Username"
              />
              <Form.Text
                id="pidnote"
                className="d-block text-left"
                style={{
                  visibility: user && !validName ? 'visible' : 'hidden',
                  marginTop: '0.5em',
                }}
              >
                <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters.
                Letters, numbers, hyphens and underscores allowed.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* Password Portion */}
        <Row>
          <Col>
            <Form.Group controlId="formPwd">
              <Form.Label className="d-block text-left">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    visibility: validPwd ? 'visible' : 'hidden',
                    top: '0',
                    right: '0',
                  }}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    visibility: validPwd || !pwd ? 'hidden' : 'visible',
                    top: '0',
                    right: '0',
                  }}
                />
              </Form.Label>
              <Form.Control
                type="password"
                id="pwd"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? 'false' : true}
                aria-describedby="pidnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                placeholder="Enter Password"
              />
              <Form.Text
                id="pidnote"
                className="d-block text-left"
                style={{
                  visibility: pwd && !validPwd ? 'visible' : 'hidden',
                  marginTop: '0.5em',
                }}
              >
                <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters.
                Capitalized letters, numbers, special characters, {specialChar},
                required.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* Confirm Password Portion */}
        <Row>
          <Col>
            <Form.Group controlId="formMatchPwd">
              <Form.Label className="d-block text-left">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    visibility:
                      validPwd && validMatch && matchPwd ? 'visible' : 'hidden',
                    top: '0',
                    right: '0',
                  }}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    visibility: validMatch || !matchPwd ? 'hidden' : 'visible',
                    top: '0',
                    right: '0',
                  }}
                />
              </Form.Label>
              <Form.Control
                type="password"
                id="matchPwd"
                autoComplete="off"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? 'false' : true}
                aria-describedby="matchidnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                placeholder="Re-Enter Password"
              />
              <Form.Text
                id="pidnote"
                className="d-block text-left"
                style={{
                  visibility: matchPwd && !validMatch ? 'visible' : 'hidden',
                  marginTop: '0.5em',
                }}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Password does not match.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Button
          href="/bootstrap/sensors"
          variant="primary"
          rounded /*disabled={!validName || !validPwd || !validMatch ? true : false}*/
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
