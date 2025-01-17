// next & react
import { useState, useEffect } from 'react';
// ui
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// functions & state
import { changeUserPwd } from '@/app/functions';
import { useUserStore, useChangePwdStore, usePopupStore } from '@/app/store';
// jsx components
import Popup from './popup';

export default function PopupChngPwd() {
  const { userData, setUserData } = useUserStore();
  const {
    oldPwd,
    newPwd,
    matchPwd,
    PwdIsValid,
    PwdIsMatch,
    setOldPwd,
    setNewPwd,
    setMatchPwd,
    setPwdIsValid,
    setPwdIsMatch,
    clearChngPwd,
  } = useChangePwdStore();
  const showChngPwd = usePopupStore((state) => state.showChngPwd);
  const toggleChngPwd = usePopupStore((state) => state.toggleChngPwd);

  const [errMsg, setErrMsg] = useState('');

  // password validation
  const specialChar = '!@#$%';
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  // password validation
  useEffect(() => {
    const result = PWD_REGEX.test(newPwd);
    setPwdIsValid(result);
    setPwdIsMatch();
  }, [newPwd, matchPwd]);

  // handle pass word change
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (PwdIsMatch && PwdIsValid) {
      const success = await changeUserPwd(
        userData.username,
        userData.id,
        oldPwd,
        newPwd,
      );

      clearChngPwd();
      toggleChngPwd();

      if (success) {
        alert('Update user successful');
      } else {
        alert('Error updating user');
      }
    }
  };

  return (
    <Popup show={showChngPwd} type="change_password">
      <Container>
        <p className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <Form onSubmit={handlePasswordChange}>
          {/* Old Password */}
          <Row>
            <Col>
              <Form.Group controlId="formOldPwd">
                <Form.Label className="d-block text-left">
                  Old Password:
                </Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  onChange={(e) => setOldPwd(e.target.value)}
                  value={oldPwd}
                  required
                  placeholder="Enter Old Password"
                />
                <Form.Text
                  id="pidnote"
                  className="d-block text-left"
                  style={{
                    visibility: 'hidden',
                    marginTop: '0.5em',
                  }}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters.
                  Capitalized letters, numbers, special characters,{' '}
                  {specialChar}, required.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* New Password */}
          <Row>
            <Col>
              <Form.Group controlId="formPwd">
                <Form.Label className="d-block text-left">
                  New Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{
                      visibility: PwdIsValid ? 'visible' : 'hidden',
                      top: '0',
                      right: '0',
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{
                      visibility: PwdIsValid || !newPwd ? 'hidden' : 'visible',
                      top: '0',
                      right: '0',
                    }}
                  />
                </Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  onChange={(e) => setNewPwd(e.target.value)}
                  value={newPwd}
                  required
                  aria-invalid={PwdIsValid ? 'false' : true}
                  aria-describedby="pidnote"
                  placeholder="Enter New Password"
                />
                <Form.Text
                  id="pidnote"
                  className="d-block text-left"
                  style={{
                    visibility: newPwd && !PwdIsValid ? 'visible' : 'hidden',
                    marginTop: '0.5em',
                  }}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters.
                  Capitalized letters, numbers, special characters,{' '}
                  {specialChar}, required.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* Confirm New Password */}
          <Row className="mb-8">
            <Col>
              <Form.Group controlId="formMatchPwd">
                <Form.Label className="d-block text-left">
                  Confirm New Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{
                      visibility:
                        PwdIsValid && PwdIsMatch && matchPwd
                          ? 'visible'
                          : 'hidden',
                      top: '0',
                      right: '0',
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{
                      visibility:
                        PwdIsMatch || !matchPwd ? 'hidden' : 'visible',
                      top: '0',
                      right: '0',
                    }}
                  />
                </Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={PwdIsMatch ? 'false' : true}
                  aria-describedby="matchidnote"
                  placeholder="Re-Enter New Password"
                />
                <Form.Text
                  id="matchidnote"
                  className="d-block text-left"
                  style={{
                    visibility: matchPwd && !PwdIsMatch ? 'visible' : 'hidden',
                    marginTop: '0.5em',
                  }}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Password does not match.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <Row>
            <Col>
              <Button
                variant="danger"
                onClick={() => {
                  clearChngPwd();
                  toggleChngPwd();
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="ml-2">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Popup>
  );
}
