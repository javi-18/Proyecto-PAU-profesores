
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./nav_bar";

export default function Layout() {
  return (
    <div className="layout">
      <h1 className="layout__title">PAU · Profesores</h1>
      <NavBar />
      <main className="layout__page">
        <Outlet />
      </main>
    </div>
  );
}
