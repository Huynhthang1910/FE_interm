import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";
import "./Createacount.scss";
import MessegeCreate from "./MessegeCreate"

const CreateAccount = (props) => {
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountRole, setAccountRole] = useState("");
  const [apiTruso, setApiTruso] = useState([]);
  const [headquarterId, setHeadquarterId] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToast, setErrorToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [message,setMassage] = useState();
  const [messageTitle, setMassageTitle] = useState();
  const token = sessionStorage.getItem("token");
  const url_getAllHeadquarter = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`;
  const url_postEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/store`

  //Xử lý API lấy tên trụ sở
  useEffect(() => {
    fetch(url_getAllHeadquarter, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token as a bearer token
      },
    })
      .then((response) => response.json())
      .then((data) => setApiTruso(data.data))
      .catch((error) => console.error(error));
  }, [token]); // Include the token as a dependency to re-fetch data when the token changes
  const headQuarters = apiTruso;

  // Xử lý API để add người dùng
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMassage("wait")
    setMassageTitle("Please wait a few seconds...")
    try {
      const response = await axios.post(
        url_postEmployee,
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
      if (response.data.status === "OK") {
        setMassage("success")
        setMassageTitle("Success! Continue your work...")
      } else {
        setMassage("fail")
        setMassageTitle("Update fail! Please check again!");
      }
    } catch (error) {
      console.error(error);
      setMassage("fail")
      setMassageTitle("Update fail! Please check again!");
    } finally {
      setLoading(false); // set loading back to false after response is received
    }
  };

  //
  const handleDismiss = () => {
    setShowToast(false);
  };
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
  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="container" id="formmm">
            <h1>ADD EMPLOYEE</h1>
            <p>Please fill in this form to add a employee.</p>

            <div className="mb-3 col-6">
              <label
                for="exampleFormControlInput1"
                className="form-label"
                controlId="formBasicEmail"
              >
                Email address
              </label>
              <input
                onChange={handleEmailChange}
                value={accountEmail}
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-3 col-6">
              <label for="inputPassword5" className="form-label">
                Password
              </label>
              <input
                onChange={handlePasswordChange}
                value={accountPassword}
                type="password"
                placeholder="Please type password inside here"
                id="inputPassword5"
                className="form-control"
                aria-labelledby="passwordHelpBlock"
                required
              />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="select-role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                value={accountRole}
                onChange={handleRoleChange}
                required
              >
                <option value="">Open this select ROLE</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
              <div className="invalid-feedback">Chọn đi thằng lol</div>
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="select-role" className="form-label">
                Head Quarter
              </label>
              <select
                className="form-select"
                value={headquarterId}
                onChange={handleHeadQuarterChange}
                required
              >
                <option value="">Open this select ROLE</option>
                {headQuarters.map((item) => (
                  <option key={item.headquarterId} value={item.headquarterId}>
                    {item.headquarterName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="select-position" className="form-label">
                Position
              </label>
              <select
                className="form-select"
                value={employeePosition}
                onChange={handlePositionChange}
                required
              >
                <option selected>Open this select POSITION</option>
                <option value="Giám đốc">CEO</option>
                <option value="Trưởng phòng Marketing">Manager</option>
                <option value="Director">Director</option>
                <option value="Deputy">Deputy</option>
                <option value="Department manager">Department manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <div className="mb-3 col-6">
              <label for="formFile" className="form-label">
                Upload image (optional) (demo)
              </label>
              <input className="form-control" type="file" id="formFile" />
              <div className="handle-button-account">

                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  id="cancel"
                  onClick={props.onClickAddd}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-success btn-lg ${
                    loading ? `disable` : null
                  }`}
                  disabled={loading}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="clearfix"></div>
          </div>
        </form>
        <Toast
          show={showToast}
          onClose={handleDismiss}
          delay={3000}
          autohide
          className="bg-success text-white"
          style={{
            position: "absolute",
            top: 70,
            right: 20,
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Create Epmloyee</strong>
          </Toast.Header>
          <Toast.Body>Add email: {accountEmail} successful 😊</Toast.Body>
        </Toast>
        <Toast
          show={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          delay={3000}
          autohide
          className="bg-danger text-white"
          style={{
            position: "absolute",
            top: 70,
            right: 20,
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{errorToast}</Toast.Body>
        </Toast>
      </div>
      {(message &&
      <MessegeCreate
        message = {message}
        messageTitle = {messageTitle}
      />)}
    </>
  );
};
export default CreateAccount;
