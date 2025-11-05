import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import DashboardPage from "./pages/dashboard_page.jsx";
import PostulantesPage from "./pages/postulantes_page.jsx";
import PreseleccionesPage from "./pages/preselecciones_page.jsx";

import "./stylesheets/index.scss";

// Crea el contenedor raíz
document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById("root"));

// Render principal
root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/postulantes" element={<PostulantesPage />} />
        <Route path="/preselecciones" element={<PreseleccionesPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
