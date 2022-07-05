import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";

import Image from "next/image";
import mypic from "../public/images/l4c.png";


export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="logo">
        <Image src={mypic} alt="logo" width={60} height={60} />
      </div>
      <div className="navbar-nav">
        <NavLink href="/" exact className="nav-item nav-link">
          Accueil
        </NavLink>
        <NavLink href="/users" className="nav-item nav-link">
          Utilisateurs
        </NavLink>
        <NavLink href="/posts" className="nav-item nav-link">
          Posts
        </NavLink>
        <a onClick={logout} className="nav-item nav-link">
          Déconnexion
        </a>
        
      </div>
    </nav>
  );
}
