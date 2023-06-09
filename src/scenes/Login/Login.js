import { useState, useEffect } from "react";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "./Login.scss";

const LOGIN_URL = `${process.env.REACT_APP_API_ENDPOINT}login`;

const SESSION_TOKEN_KEY = "token";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (token) => {
    onLogin();
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // set loading to true
    try {
      const {
        data: { data: token, message },
      } = await axios.post(LOGIN_URL, { email, password });
      message === "Login Fail"
        ? setToastMessage("Please check Email or Password")
        : handleLogin(token);
      setToastType(message === "Login Fail" ? "danger" : "success");
      setShowToast(true);
    } catch (error) {
      console.log(error);
      setToastType("danger");
      setToastMessage("Something went wrong. Please try again later.");
      setShowToast(true);
    } finally {
      setLoading(false); // set loading back to false after response is received
    }
  };

  const handleShowForgotPassword = () => setShowForgotPassword(true);
  const handleBackToLogin = () => setShowForgotPassword(false);
  const hideToastMessage = () => {
    setShowToast(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (token) {
      handleLogin(token);
    }
  }, []);

  return (
    <div id="backgr">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4 text-center ">
                  <img
                    id="imgedit"
                    src="assets/urbanlogo.png"
                    alt="Ảnh gái xinh"
                  />
                  {showForgotPassword ? (
                    <ForgotPassword onBackToLogin={handleBackToLogin} />
                  ) : (
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
                            <p className="small">
                              <a
                                className="text-primary"
                                onClick={handleShowForgotPassword}
                                style={{ cursor: "pointer" }}
                              >
                                Forgot password?
                              </a>
                            </p>
                          </Form.Group>
                        </Form.Group>
                        <div className="d-grid">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className={loading ? "disabled" : ""}
                          >
                            Login
                          </Button>
                        </div>
                      </Form>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <ToastContainer
            position="end-50"
            style={{ bottom: "70px", right: "5px" }}
          >
            <Toast
              onClose={hideToastMessage}
              show={showToast}
              delay={3000}
              autohide
              bg={toastType}
            >
              <Toast.Body
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                {toastMessage}
              </Toast.Body>
            </Toast>
          </ToastContainer>
          <Card.Footer>
            <div className="d-flex flex-column flex-md-row justify-content-between py-3 px-3 px-xl-3 bg-primary fixed-bottom">
              <div className="text-white mb-1 mb-md-0 text-center">
                Copyright UrbanVietNam© 2023. All rights reserved
              </div>
            </div>
          </Card.Footer>
        </Row>
      </Container>
    </div>
  );
}
