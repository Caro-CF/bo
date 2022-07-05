import { useState, useEffect } from "react";

import { Link } from "../../components";

import { ressourceService } from "services/ressource.service";
import { userService } from "services";
import InfoModal from "components/InfoModal";
import { func } from "prop-types";

export default Index;

function Index() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ressources, setRessources] = useState(null);
  const [users, setUsers] = useState(null);
  // search
  const [query, setQuery] = useState("");

  useEffect(() => {
    ressourceService.getAll().then((x) => setRessources(x));
    userService.getAll().then((y) => setUsers(y));
  }, []);

  console.log(ressources);
  console.log(users);

  function deleteRessource(id) {
    setRessources(
      ressources.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setRessources((ressources) => ressources.filter((x) => x.id !== id));
      ressourceService.getAll().then((x) => setRessources(x));
    });
  }

  return (
    <div className="m-5">
      <h1>Posts</h1>
      <input
        className="search float-right"
        placeholder="Rechercher..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "10%" }}></th>
            <th style={{ width: "30%" }}>Posts</th>
            <th style={{ width: "30%" }}>Media</th>
            <th style={{ width: "30%" }}>Créateur</th>
            <th style={{ width: "30%" }}>Vues</th>
            <th style={{ width: "30%" }}>J&apos;aime</th>
            <th style={{ width: "30%" }}>Partages</th>
            <th style={{ width: "30%" }}>Date de création</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {ressources &&
            ressources
              .filter(
                (search) =>
                  search.answers.toLowerCase().includes(query) ||
                  search.nb_views.toLowerCase().includes(query) ||
                  search.nb_likes.toLowerCase().includes(query) ||
                  search.nb_shares.toLowerCase().includes(query) ||
                  search.created_at.toLowerCase().includes(query)
              )
              .map((ressource) => (
                <tr key={ressource.res_id}>
                  <td>
                    {/* <img
                      src={`http://linksforcitizens.local:3000/public/upload/images/avatar/${user.avatar_img}`}
                      width={50}
                      height={50}
                      alt="Avatar de l'utilisateur"
                    /> */}
                  </td>
                  <td>{ressource.answers}</td>
                  <td>{ressource.media}</td>
                  <td>{ressource.resOwner.pseudo}</td>
                  <td>{ressource.nb_views}</td>
                  <td>{ressource.nb_likes}</td>
                  <td>{ressource.nb_shares}</td>
                  <td>{ressource.created_at}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link
                      href={`/ressources/edit/${ressource.res_id}`}
                      className="btn btn-sm btn-primary mr-1"
                      id="btn-edit"
                    >
                      Edition
                    </Link>
                    <InfoModal
                      element="utilisateur"
                      id={ressource.res_id}
                      disabled="ressource"
                    ></InfoModal>

                    {/* <button
                    onClick={() => deleteUser(user.usr_id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Supprimer</span>
                    )}
                  </button> */}
                  </td>
                </tr>
              ))}
          {!ressources && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {ressources && !ressources.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">Aucun utilisateur</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
