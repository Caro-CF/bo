import React, { useState, useEffect } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, CloseButton } from "react-bootstrap";
import { userService } from "services";
import { postService } from "services/post.service";
import { useRouter } from "next/router";

export default function InfoModal(props) {
  const [show, setShow] = useState(false);
  const id = props.id;
  //   const dis ="user";
  const dis = props.disabled;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  //   suppression Utilisateur + post
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
    postService.getAll().then((x) => setPosts(x));
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

  function deletePost(id) {
    setPosts(
      posts.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );

    postService.delete(id).then(() => {
      setPosts((posts) => posts.filter((x) => x.id !== id));
      postService.getAll().then((x) => setPosts(x));
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
          Voulez vous supprimer cet {props.element} id : {props.id} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              props.element === "utilisateur"
                ? deleteUser(id)
                : props.element === "post"
                ? deletePost(id)
                : null
            }
          >
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
