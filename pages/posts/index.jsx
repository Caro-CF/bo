import { useState, useEffect } from "react";
import { Link } from "../../components";
import { postService } from "services/post.service";
import InfoModal from "components/InfoModal";

export default Index;

function Index() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ressources, setRessources] = useState(null);

  // search
  const [query, setQuery] = useState("");

  useEffect(() => {
    postService.getAll().then((x) => setRessources(x));
  }, []);

  console.log(ressources);

  function deleteRessource(id) {
    setRessources(
      ressources.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    ressourceService.delete(id).then(() => {
      setRessources((ressources) => ressources.filter((x) => x.id !== id));
      postService.getAll().then((x) => setRessources(x));
    });
  }

  return (
    <div className="m-5">
      <h1>Posts</h1>
      <input
        className="search float-right mb-4"
        placeholder="Rechercher..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "10%" }}></th>
            <th style={{ width: "30%" }}>Ress ID</th>
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
                  search.resOwner.pseudo.toLowerCase().includes(query) ||
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
                  <td>{ressource.res_id}</td>
                  <td>{ressource.answers}</td>
                  <td>{ressource.media}</td>
                  <td>{ressource.resOwner.pseudo}</td>
                  <td>{ressource.nb_views}</td>
                  <td>{ressource.nb_likes}</td>
                  <td>{ressource.nb_shares}</td>
                  <td>{ressource.created_at}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link
                      href={`/posts/edit/${ressource.res_id}`}
                      className="btn btn-sm btn-primary mr-1"
                      id="btn-edit"
                    >
                      Edition
                    </Link>
                    <InfoModal
                      element="post"
                      id={ressource.res_id}
                      disabled="ressource"
                    ></InfoModal>
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
