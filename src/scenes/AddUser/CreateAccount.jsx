import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

const CreateAccount = (props) => {
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountRole, setAccountRole] = useState("");
  const [apiTruso, setApiTruso] = useState([]);
  const [headquarterId, setHeadquarterId] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const token = sessionStorage.getItem("token");

  //Xử lý API lấy tên trụ sở
  useEffect(() => {
    fetch("https://be-intern.onrender.com/api/v2/headquarter/", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token as a bearer token
      },
    })
      .then((response) => response.json())
      .then((data) => setApiTruso(data.data))
      .catch((error) => console.error(error));
  }, [token]); // Include the token as a dependency to re-fetch data when the token changes
  const headQuarters = apiTruso;
  console.log(headQuarters);

  // Xử lý API để add người dùng
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://be-intern.onrender.com/api/v2/employee/store",
        {
          accountEmail,
          accountPassword,
          accountRole,
          headquarterId,
          employeePosition,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.status);
      if (response.data.status === "OK") {
        alert(`Thêm email: ${accountEmail} thành công`);
      } else {
        alert("Thêm thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("Thêm thất bại");
    }
  };

  //
  const handleEmailChange = (event) => {
    setAccountEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setAccountPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setAccountRole(event.target.value);
  };
  const handleHeadQuarterChange = (event) => {
    setHeadquarterId(event.target.value);
  };
  const handlePositionChange = (event) => {
    setEmployeePosition(event.target.value);
  };

  //
  return (
    <div>
      <Container>
        <h1 className="text-center">ADD USER</h1>
        <p className="text-center">Please fill in this form to add a user.</p>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Label column sm="2">
              Email address
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={accountEmail}
                onChange={handleEmailChange}
                required
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Please type password inside here"
                value={accountPassword}
                onChange={handlePasswordChange}
                required
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm="2">
              Role
            </Form.Label>
            <Col sm="10">
              <Form.Select
                value={accountRole}
                onChange={handleRoleChange}
                required
              >
                <option value="">Open this select ROLE</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a ROLE.
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm="2">
              Trụ sở
            </Form.Label>
            <Col sm="10">
              <Form.Select
                value={headquarterId}
                onChange={handleHeadQuarterChange}
                required
              >
                <option value="">Open this select HEADQUARTER</option>
                {headQuarters.map((headQuarter) => (
                  <option
                    key={headQuarter.headquarterId}
                    value={headQuarter.headquarterId}
                  >
                    {headQuarter.headquarterName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {/* Please select a HEADQUARTER. */}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm="2">
              Chức vụ
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Chức vụ của nhân viên"
                value={employeePosition}
                onChange={handlePositionChange}
                required
              />
            </Col>
          </Row>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Add user
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};
export default CreateAccount;
