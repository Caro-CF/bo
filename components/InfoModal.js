import React, { useState, useEffect } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, CloseButton } from "react-bootstrap";
import { userService } from "services";
import { useRouter } from "next/router";

export default function InfoModal(props) {
  const [show, setShow] = useState(false);
  const id = props.id;
  //   const dis ="user";
  const dis = props.disabled;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

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
      router.reload(window.location.pathname);
    });


    handleClose();
    
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
          <Modal.Title>Supprimer un {props.element} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez vous supprimer cet {props.element} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => deleteUser(id)}
          >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
