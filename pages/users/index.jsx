import { useState, useEffect } from "react";

import { Link } from "../../components";
import { userService } from "../../services";
import { LoadModal } from "components/LoadModal";
import InfoModal from "components/InfoModal";


export default Index;



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
function Index() {
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
    <div>
      <h1>Utilisateurs</h1>
      <Link href="/users/add" className="btn btn-sm btn-success mb-2">
        Ajouter un utilisateur
      </Link>
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
            users.map((user) => (
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
                  <InfoModal />
                  
                  <button
                    onClick={() => deleteUser(user.usr_id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Supprimer</span>
                    )}
                  </button>
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
