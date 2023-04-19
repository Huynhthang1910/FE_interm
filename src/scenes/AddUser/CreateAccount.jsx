import { useState, useEffect } from "react";
import axios from "axios";
import "./Createacount.scss";
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

  // Xử lý API để add người dùng
  const handleSubmit = async (event) => {
    event.preventDefault();
    {
      console.log(props.lon);
    }
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

      if (response.data.status === "OK") {
        alert(`Add email ${accountEmail} successfully!!!!`);
      } else {
        alert("Email add failed");
      }
    } catch (error) {
      console.error(error);
      alert("Email add failed");
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
    <>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="container" id="formmm">
            <h1>ADD USER</h1>
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
              <label for="select-role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                value={accountRole}
                onChange={handleRoleChange}
              >
                <option selected>Open this select ROLE</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className="mb-3 col-6">
              <label for="select-role" className="form-label">
                Headquater
              </label>
              <select
                className="form-select"
                value={headquarterId}
                onChange={handleHeadQuarterChange}
              >
                <option selected>Open this select ROLE</option>
                {headQuarters.map((item) => (
                  <option value={item.headquarterId}>
                    {item.headquarterName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 col-6">
              <label for="select-position" className="form-label">
                Position
              </label>
              <select
                className="form-select"
                value={employeePosition}
                onChange={handlePositionChange}
              >
                <option selected>Open this select POSITION</option>
                <option value="Giám đốc">CEO</option>
                <option value="Trưởng phòng Marketing">Manager</option>
                <option value="Trưởng phòng CNTT">Director</option>
                <option value="Trưởng phòng CNTT">Deputy</option>
                <option value="Trưởng phòng CNTT">Department manager</option>
                <option value="Trưởng phòng CNTT">Employee</option>
              </select>
            </div>

            <div className="mb-3 col-6">
              <label for="formFile" className="form-label">
                Upload image (optional) (demo)
              </label>
              <input className="form-control" type="file" id="formFile" />
            </div>

            <div className="clearfix">
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={props.onClickAddd}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success btn-lg">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateAccount;
