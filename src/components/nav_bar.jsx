
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" className="nav-bar__link" end>
        Dashboard
      </NavLink>
      <NavLink to="/postulantes" className="nav-bar__link">
        Postulantes
      </NavLink>
      <NavLink to="/preselecciones" className="nav-bar__link">
        Preselecciones
      </NavLink>
    </nav>
  );
}
