import React, { useState } from "react";

const TextBoxComponent = ({ user2, setUsers }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    if (event.target.value === "") {
      setUsers(user2);
    } else {
      const filteredUsers = user2.filter((user) =>
        user.employeeName
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  return (
    <div>
      Entered value to find:
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};

export default TextBoxComponent;
