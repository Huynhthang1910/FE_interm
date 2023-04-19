import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function DeleteButton({ api, resetView }) {
  const [id, setId] = useState(null);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    resetView(id);
    if (id !== null) {
      console.log(id)
      fetch(
        `https://be-intern.onrender.com/api/v2/employee/${id}/delete`,

        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token as a bearer token
          },
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.message === "Xóa Thất Bại") {
            alert("HONG ỔN RỒI HUY ƠI");
          } else {
            alert("THÀNH CÔNG RỒI HUY ƠI");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <Button variant="danger" onClick={() => setId(api)}>
      XÓA
    </Button>
  );
}

export default DeleteButton;
