import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";
import { userService } from "services";
import { Link } from "../components";


export default Home;

function Home() {
  // const [users, setUsers] = useState(null);

  // useEffect(() => {
  //   userService.getById(user.usr_id).then((x) => setUsers(x));
  // }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  
  console.table(user);
  
  return (
    
    <div id="containter" className="m-5"> 
      
      <div>Bienvenue {user.user.firstanme} {user.user.lastname}</div>
      
      <Link href="/users"> - Accéder à la liste des utilisateur</Link>
    </div>
  );
}
