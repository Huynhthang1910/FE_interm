import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [database, setDatabase] = useState([]);

  // XỬ lý API
  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/PhucChiVas161/FE-Intern/database"
    )
      .then((response) => response.json())
      .then((data) => setDatabase(data))
      .catch((error) => console.error(error));
  }, []);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const handleSubmit = (event) => {
    //Tránh load lại trang
    event.preventDefault(); //<== dòng này có nghĩ là khi ng dùng nhập sai thì cũng ko load lại trang

    const { uname, pass } = document.forms[0]; //default ở đây là var

    // Tìm thông tin user login
    const userData = database.find((user) => user.email === uname.value);

    // So sánh thông tin
    if (userData) {
      if (userData.pass !== pass.value) {
        // Sai password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Đéo tồn tại ng dùng
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Khởi tạo JSX Code Error
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // Khởi tạo form
  const renderForm = (
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
                    src={`assets/urbanlogo.png`}
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
                          name="uname"
                          required
                        />
                        {renderErrorMessage("uname")}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="pass"
                          required
                        />
                        {renderErrorMessage("pass")}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
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
  return (
    <div className="app">
      <div className="login-form">
        {isSubmitted ? (
          <div>
            <></>
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}
