import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

function DeleteButton({ api, resetView }) {
  const [id, setId] = useState(null);

  useEffect(() => {
    resetView(id);
    if (id !== null) {
      fetch(``, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            alert("thanh cong roi mng oi");
          } else {
            alert("Hong on roi Huy oi");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return <Button variant="danger" onClick={() => setId(api)}>XÓA</Button>;
}



export default DeleteButton;
