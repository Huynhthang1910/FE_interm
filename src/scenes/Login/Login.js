import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

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

      //Code này chỉ test xem header, vui lòng xóa khi publish code
      axios.interceptors.request.use(
        function (config) {
          console.log(config.headers); // In ra header trước khi gửi lên server
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );

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
            alert("Your session has expired. Please log in again.");
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

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4 text-center">
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
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary fixed-bottom">
                  <div className="text-white mb-3 mb-md-0">
                    Copyright UrbanVietNam© 2023. All rights reserved
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
