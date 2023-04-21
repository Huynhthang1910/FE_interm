import { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../Hook/AuthContext";
import { useTokenExpirationCheck } from "../../Hook/TokenExpirationCheck";

<<<<<<< HEAD
const LOGIN_URL = "https://be-intern.onrender.com/login";
=======
const LOGIN_URL = "https://be-intern-g6fh.onrender.com/login";
const DECODE_URL = "https://be-intern-g6fh.onrender.com/decode";
>>>>>>> 91e423e472286ecf6dba081e63a97254920bf9f9
const SESSION_TOKEN_KEY = "token";

export default function Login({ onLogin }) {
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  const handleLogin = async (token) => {
    setLoggedIn(true);
=======
  const checkTokenExpiration = async (token) => {
    try {
      const response = await axios.post(
        DECODE_URL,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const {
        data: { message },
      } = response;
      console.log(response);
      if (message === "Expired Token") {
        sessionStorage.removeItem(SESSION_TOKEN_KEY);
        alert("fadfa");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (token) => {
    setLoggedIn(true);
    onLogin();
>>>>>>> 91e423e472286ecf6dba081e63a97254920bf9f9
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    onLogin();
    setAuthenticated(true);
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

  useTokenExpirationCheck();

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
                    <div>
                      <p className=" mb-5">
                        Please enter your login and password!
                      </p>
                      <div className="mb-3">
                        <Form onSubmit={handleSubmit}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
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
