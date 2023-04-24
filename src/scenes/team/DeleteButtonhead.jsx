import { colors } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./DeleteButtonhead.scss";

function DeleteButtonhead({ api, resetView }) {
  const [id, setId] = useState(null);
  const token = sessionStorage.getItem("token");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (id !== null) {
      fetch(
        `${process.env.REACT_APP_API_ENDPOINT}api/v2/headquarter/${id}/delete`,

        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token as a bearer token
          },
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.message === "Xóa Thất Bại") {
            alert("Unsuccessfully deleted !!!");
          } else {
            alert("Successfully deleted !!!");
            resetView(id);
            handleClose();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        DELETE
      </Button>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this headquarter?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={() => setId(api)}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default DeleteButtonhead;
