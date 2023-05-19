import React, { useState, useEffect } from "react";
import axios from "axios";

const OptionsComponent2 = ({ setSche, sche2 }) => {
  const token = sessionStorage.getItem("token");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const allhead = `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/`;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(allhead);
      setOptions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "All") {
      setSche(sche2);
    } else {
      setSche(
        sche2.filter(
          (item) => item.workScheduleDestination === event.target.value
        )
      );
    }
  };

  return (
    <div>
      Choose Headquater EndPoint :
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="All">All</option>
        {options.map((option, index) => (
          <option key={index} value={option.headquarterName}>
            {option.headquarterName}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>
    </div>
  );
};

export default OptionsComponent2;
