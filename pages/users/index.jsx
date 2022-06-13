import { useState, useEffect } from "react";

import { Link } from "../../components";
import { userService } from "../../services";

export default Index;

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
                <div className="p-2">No Users To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// import { apiUrl } from 'config';

// function UserList({ data }) {
//   return (
//     <>
//       <div>
//         <form
//           action="`${apiUrl}/users`"
//           method="post"
//         >
//           <label htlmfor={data.firstname}>First name:</label>
//           <input type="text" id="first" name="first" />
//           <label htlmfor={data.mail}>mail:</label>
//           <input type="text" id="mail" name="mail" />
//           <button type="submit">Submit</button>
//         </form>
//       </div>

//       <ul>
//         {data.map((data) => (
//           <li key={data.usr_id}>
//             {data.firstname} &nbsp;{data.mail}
//             <button type="submit">Modifier</button>&nbsp;
//             <button type="submit">Supprimer</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`${apiUrl}/users`);
//   const data = await res.json();
//   console.log(data);
//   //   const option = {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ data }),
//   //   };

//   //   const response = await fetch(res, option);
//   //   const responseJson = await response.json();
//   //   console.log(responseJson);

//   // Pass data to the page via props
//   return { props: { data } };
// }

// export default UserList;
