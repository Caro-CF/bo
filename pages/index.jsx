import { Search } from "components/Search";
import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";
import { userService } from "services";
import { Link } from "../components";


export default Home;

function Home() {
 
  const user = JSON.parse(localStorage.getItem("user"));
  
  console.table(user);
  
  return (
    
    <div id="containter" className="m-5"> 
      
      <h2>Bienvenue {user.user.firstname} {user.user.lastname}</h2>

      <ul>
        <li><Link href="/users">Accéder à la liste des utilisateurs</Link></li>
        {/* <li><Link href="/stats">Accéder à la liste des utilisateur</Link></li> */}
      </ul>
      
      <Search />
    </div>
  );
}
