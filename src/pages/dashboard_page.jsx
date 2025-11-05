import React from 'react';
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="section-title">Panel del Profesor</h2>
      <p className="muted">Resumen general de tus cursos y postulantes.</p>

      {/* KPI cards */}
      <div className="grid-cards">
        <div
          className="card card--kpi card--click"
          onClick={() => navigate("/postulantes")}
        >
          <h3>Total postulantes</h3>
          <b>—</b>
          <p className="muted">Ver listado completo</p>
        </div>

        <div
          className="card card--kpi card--click"
          onClick={() => navigate("/preselecciones")}
        >
          <h3>Preseleccionados</h3>
          <b>—</b>
          <p className="muted">Candidatos listos para evaluación</p>
        </div>
      </div>

      {/* Cursos */}
      <h3 className="section-title" style={{ marginTop: 24 }}>
        Cursos activos
      </h3>

      <div className="grid-courses">
        <div
          className="card card--click"
          onClick={() => navigate("/postulantes?curso=INF322")}
        >
          <b>INF322</b>
          <p>Interfaces Usuarias · 2025-1</p>
          <small>10 postulantes · 0/2 seleccionados</small>
        </div>

        <div
          className="card card--click"
          onClick={() => navigate("/postulantes?curso=INF234")}
        >
          <b>INF234</b>
          <p>Introducción a la Programación · 2025-1</p>
          <small>5 postulantes · 1/3 seleccionados</small>
        </div>
      </div>
    </section>
  );
}