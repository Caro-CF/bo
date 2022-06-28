import { useEffect, useState } from "react";
import { userService } from "services";

export { Search };

function Search() {

  const [data, setData] = useState(null);
  
  useEffect(() => {
    userService.getAll().then((res)=> setData(res));
  })

  const [query, setQuery] = useState("");
  const keys = ["firstname", "lastname", "mail", "roles", "pseudo"];

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(query))
  //   );
  // };
  return (
    <div className="app">
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <ul>
        {data
          .filter(
            (asd) =>
              asd.firstname.toLowerCase().includes(query) ||
              asd.lastname.toLowerCase().includes(query)
          )
          .map((data) => (
            <li className="listItem" key={data.usr_id}>
              {data.firstname} {data.lastname}
            </li>
          ))}
      </ul>
    </div>
  );
}

// function Search() {
//   const [data, setData] = useState("");

//   useEffect(() => {
//     userService.getAll().then((x) => setData(x));
//   }, []);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const handleChange = (e) => setSearchTerm(e.target.value);

//   useEffect(() => {
//     const results = data.filter(
//       (o) =>
//         o.firstname.toLowerCase.includes(searchTerm) ||
//         o.lastname.toLowerCase.includes(searchTerm) ||
//         o.mail.toLowerCase.includes(searchTerm) ||
//         o.roles.toLowerCase.includes(searchTerm) ||
//         o.pseudo.toLowerCase.includes(searchTerm)
//     );
//     setSearchResults(results);
//   }, [searchTerm]);

//   return (
//     <>
//       <Form className="d-flex justify-content-end">
//         <FormControl
//           type="search"
//           placeholder="Rechercher"
//           className="me-2"
//           aria-label="Search"
//           value={searchTerm}
//           onChange={handleChange}
//         />
//         <Button variant="outline-success">Rechercher</Button>
//       </Form>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th style={{ width: "10%" }}></th>
//             <th style={{ width: "30%" }}>Pseudo</th>
//             <th style={{ width: "30%" }}>Prenom</th>
//             <th style={{ width: "30%" }}>Nom</th>
//             <th style={{ width: "30%" }}>Email</th>
//             <th style={{ width: "30%" }}>Role</th>
//             <th style={{ width: "10%" }}></th>
//           </tr>
//         </thead>
//         <tbody>
//           {searchResults &&
//             searchResults.map((user) => (
//               <tr key={user.usr_id}>
//                 <td>
//                   <img
//                     src={`http://linksforcitizens.local:3000/public/upload/images/avatar/${user.avatar_img}`}
//                     width={50}
//                     height={50}
//                     alt="Avatar de l'utilisateur"
//                   />
//                 </td>
//                 <td>{user.pseudo}</td>
//                 <td>{user.firstname}</td>
//                 <td>{user.lastname}</td>
//                 <td>{user.mail}</td>
//                 <td>{user.roles}</td>
//                 <td style={{ whiteSpace: "nowrap" }}>
//                   <Link
//                     href={`/users/edit/${user.usr_id}`}
//                     className="btn btn-sm btn-primary mr-1"
//                     id="btn-edit"
//                   >
//                     Edition
//                   </Link>
//                   <InfoModal
//                     element="utilisateur"
//                     id={user.usr_id}
//                     disabled="user"
//                   ></InfoModal>

//                   {/* <button
//                     onClick={() => deleteUser(user.usr_id)}
//                     className="btn btn-sm btn-danger btn-delete-user"
//                     disabled={user.isDeleting}
//                   >
//                     {user.isDeleting ? (
//                       <span className="spinner-border spinner-border-sm"></span>
//                     ) : (
//                       <span>Supprimer</span>
//                     )}
//                   </button> */}
//                 </td>
//               </tr>
//             ))}
//           {!searchResults && (
//             <tr>
//               <td colSpan="4" className="text-center">
//                 <div className="spinner-border spinner-border-lg align-center"></div>
//               </td>
//             </tr>
//           )}
//           {searchResults && !searchResults.length && (
//             <tr>
//               <td colSpan="4" className="text-center">
//                 <div className="p-2">Aucun utilisateur</div>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </>
//   );
// }
