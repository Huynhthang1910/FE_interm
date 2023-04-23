import { useState, useEffect } from "react";
import axios from "axios";
import "./CreateHeadquater.scss";

const CreateHeadquater = (props) => {
  const [headquarterAddress, setHeadquarterAddress] = useState("");
  const [headquarterName, setHeadquarterName] = useState("");
  const token = sessionStorage.getItem("token");
  const [showComponent, setShowComponent] = useState(false);

  // Xử lý API để add người dùng
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://beintern-production.up.railway.app/api/v2/headquarter/store",
        {
          headquarterName,
          headquarterAddress,
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
        alert(`Thêm Trụ Sở: ${headquarterName} thành công`);
      } else {
        alert("Thêm thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("Thêm thất bại");
    }
  };

  //
  const handleheadquarterName = (event) => {
    setHeadquarterName(event.target.value);
  };

  const handleheadquarterAddress = (event) => {
    setHeadquarterAddress(event.target.value);
  };

  //
  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="container" id="formmm">
            <h1>ADD HEADQUATER</h1>
            <p>Please fill in this form to add a headquater.</p>

            <div className="mb-3 col-6">
              <label
                for="exampleFormControlInput1"
                className="form-label"
                controlId="formBasicEmail"
              >
                HEADQUATER NAME
              </label>
              <input
                onChange={handleheadquarterName}
                value={headquarterName}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Headquater Name"
                required
              />
            </div>
            <div className="mb-3 col-6">
              <label for="inputPassword5" className="form-label">
                HEADQUATER Address
              </label>
              <input
                onChange={handleheadquarterAddress}
                value={headquarterAddress}
                type="text"
                placeholder="Headquater Adress"
                id="inputPassword5"
                className="form-control"
                aria-labelledby="passwordHelpBlock"
                required
              />{" "}
              <button
                type="button"
                className="btn btn-danger btn-lg"
                id="cancel-headquarter"
                onClick={props.onClickAddd}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success btn-lg" id="add-headquarter">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateHeadquater;
