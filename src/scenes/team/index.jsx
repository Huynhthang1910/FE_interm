import React, { useState } from "react";
import Viewheadquarter from "./Viewheadquarter";
import CreateHeadquater from "../AddHeaquater/CreateHeadquater";

const Team = (props) => {
  const [showComponent, setShowComponent] = useState(true);
  const onClickAdd = () => {
    // Gọi MyComponent khi nút được nhấn
    setShowComponent(!showComponent);
  };
  return (
    <>
      {showComponent === true ? (
        <Viewheadquarter onClickAddd={onClickAdd} />
      ) : (
        <CreateHeadquater onClickAddd={onClickAdd} />
      )}
    </>
  );
};

export default Team;