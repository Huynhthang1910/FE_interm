import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");

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
  const handleCancel = () => {
    onBackToLogin();
  };

  return (
    <Form onSubmit={handleForgotPassword}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-center">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <div className="col-12">
        <Button
          variant="dark"
          type="button"
          className="col-6"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit" className="col-6">
          Reset Password
        </Button>
      </div>
    </Form>
  );
}
