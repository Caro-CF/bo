import Image from "next/image";
import mypic from "../public/images/l4c.png";
import { NavLink } from ".";
import styles from "../styles/Nav.module.css";
export { Nav };

function Nav() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" id="navbar">
      <div className="logo">
        <Image src={mypic} alt="logo" width={60} height={60} />
      </div>
      <div className="navbar-nav">
        <NavLink href="/" exact className="nav-item nav-link">
          Home
        </NavLink>
        <NavLink href="/users" className="nav-item nav-link">
          Utilisateurs
        </NavLink>
      </div>
    </nav>
  );
}
