import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Login.scss";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      const subStrings = decoded.sub;
      const jsonSub = JSON.parse(subStrings);
      const role = jsonSub.accountRole;
      const employeeId = jsonSub.employeeId;
      onLogin(role, employeeId);
      setLoggedIn(true);

      // Kiểm tra token hết hạn
      axios
        .post(
          "https://be-intern.onrender.com/decode",
          { token },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          console.log(response);
          if (response.data.message === "Expired Token") {
            // Xóa token khỏi session
            sessionStorage.removeItem("token");
            // Hiển thị popup thông báo yêu cầu đăng nhập lại
            alert("Your session has expired. Please Login again.");
            // Reload the page after the user clicks "OK"
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [onLogin]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reqBody = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://be-intern.onrender.com/login",
        reqBody
      );

      const token = response.data.data;
      const errorFail = response.data.message;
      if (errorFail === "Login Fail") {
        alert("Please check Email or Password");
      } else {
        const decoded = jwt_decode(token);
        const subStrings = decoded.sub;
        const jsonSub = JSON.parse(subStrings);
        const role = jsonSub.accountRole;
        const employeeId = jsonSub.employeeId;

        onLogin(role, employeeId);
        sessionStorage.setItem("token", token);
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (email.trim() === "") {
      alert("Please enter your email to reset password.");
      return;
    }

    try {
      const response = await axios.post(
        "https://be-intern.onrender.com/api/v2/account/forgot-password",
        { accountEmail: email }
      );
      console.log(response);

      alert(`Please check ${email} to reset password.`);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <p className=" mb-5">Please enter your login and password!</p>
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
                              onClick={handleForgotPassword}
                              style={{ cursor: "pointer" }}
                            >
                              Forgot password?
                            </a>
                          </p>
                        </Form.Group>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
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
