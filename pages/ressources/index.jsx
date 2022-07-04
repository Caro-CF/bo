import { useState, useEffect } from "react";

import { Link } from "../../components";
import { userService } from "../../services";
import InfoModal from "components/InfoModal";
import { func } from "prop-types";

export default Index;

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
function Index() {
  const [users, setUsers] = useState(null);
  // search
  const [query, setQuery] = useState("");

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  function reload() {
    userService.getAll().then((x) => setUsers(x));
  }

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
    <div className="m-5">
      <h1>Utilisateurs</h1>
      {/* Search */}
      
      <Link href="/users/add" className="btn btn-sm btn-success mb-2">
        Ajouter un utilisateur
      </Link>

      <input
        className="search float-right"
        placeholder="Rechercher..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "10%" }}></th>
            <th style={{ width: "30%" }}>Pseudo</th>
            <th style={{ width: "30%" }}>Prenom</th>
            <th style={{ width: "30%" }}>Nom</th>
            <th style={{ width: "30%" }}>Email</th>
            <th style={{ width: "30%" }}>Role</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users
              .filter(
                (search) =>
                  search.firstname.toLowerCase().includes(query) ||
                  search.lastname.toLowerCase().includes(query) ||
                  search.roles.toLowerCase().includes(query) ||
                  search.mail.toLowerCase().includes(query) ||
                  search.pseudo.toLowerCase().includes(query) 
              )
              .map((user) => (
                <tr key={user.usr_id}>
                  <td>
                    <img
                      src={`http://linksforcitizens.local:3000/public/upload/images/avatar/${user.avatar_img}`}
                      width={50}
                      height={50}
                      alt="Avatar de l'utilisateur"
                    />
                  </td>
                  <td>{user.pseudo}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.mail}</td>
                  <td>{user.roles}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link
                      href={`/users/edit/${user.usr_id}`}
                      className="btn btn-sm btn-primary mr-1"
                      id="btn-edit"
                    >
                      Edition
                    </Link>
                    <InfoModal
                      element="utilisateur"
                      id={user.usr_id}
                      disabled="user"
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
          {!users && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {users && !users.length && (
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
