import React, { useEffect, useState, useRef } from "react";
import ChangeAvatar from "./EditProfileAvatar/ChangeAvatar";

const EditProfileAvatar = ({ image, setImage }) => {
  const [avatarState, setAvatarState] = useState("");
  const [passDownState, setPassDownStateState] = useState("");
  const handleEditData = (test) => {
    setAvatarState(test);
  };
  // useEffect(() => {
  //     setPassDownStateState(avatarState)
  // }, [avatarState])

  return (
    <form className="ChangeAvatar">
      <ChangeAvatar
        handleExportAvatar={handleEditData}
        image={image}
        setImage={setImage}
      />
    </form>
  );
};

export default EditProfileAvatar;
