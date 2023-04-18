import React, { useState, useEffect } from "react";
import Viewuser from "./Viewusers";
import CreateAccount from "../AddUser/CreateAccount";

const Contacts = () => {
  const [showComponent, setShowComponent] = useState(false);
  const onClickAdd = () => {
    // Gọi MyComponent khi nút được nhấn
    setShowComponent(!showComponent);
  };

  return (
    <>
      {showComponent === true ? (
        <Viewuser onClickAddd={onClickAdd} />
      ) : (
        <CreateAccount onClickAddd={onClickAdd} />
      )}
    </>
  );
};

export default Contacts;
