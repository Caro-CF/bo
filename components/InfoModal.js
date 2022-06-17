import React, { useState, useEffect } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";
import { userService } from "services";

export default function InfoModal(props) {
  const [show, setShow] = useState(false);
  const id = props.id;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   suppression Utilisateur
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
      userService.getAll().then((x) => setUsers(x));
    });
  }

  return (
    <>
      <Button
        className="btn btn-sm btn-danger btn-delete-user"
        onClick={handleShow}
      >
        Supprimer
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez vous supprimer cet id {id} {props.element} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => deleteUser(id)}
            // disabled={props.disabled}
          >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
