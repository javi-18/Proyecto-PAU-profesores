import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import data from "../data/mock_postulantes"; 

export default function PostulantesPage() {
  const params = new URLSearchParams(useLocation().search);
  const curso = params.get("curso");
  const [sortBy, setSortBy] = useState("nota_desc");

  const lista = useMemo(() => {
    const base = data.filter((p) => p.status === "Postulante");
    const filtrada = curso ? base.filter((p) => p.course === curso) : base;
    const arr = [...filtrada];
    if (sortBy === "nota_desc") arr.sort((a, b) => b.grade - a.grade);
    if (sortBy === "nota_asc")  arr.sort((a, b) => a.grade - b.grade);
    if (sortBy === "avance_desc") arr.sort((a, b) => b.progress - a.progress);
    if (sortBy === "exp_desc") arr.sort((a, b) => b.experience - a.experience);
    return arr;
  }, [curso, sortBy]);

  return (
    <section>
      <h2 className="section-title">
        {curso ? `${curso} — Postulantes` : "Todos los postulantes"}
      </h2>

      <div className="toolbar">
        <label>Ordenar por: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="nota_desc">Nota (Mayor)</option>
          <option value="nota_asc">Nota (Menor)</option>
          <option value="avance_desc">Avance (Mayor)</option>
          <option value="exp_desc">Experiencia (Mayor)</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nota</th>
              <th>Avance</th>
              <th>Experiencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td><b>{p.grade}</b></td>
                <td>{p.progress}%</td>
                <td>{p.experience} sem.</td>
                <td>
                  <button className="btn">★ Preseleccionar</button>
                  <button className="btn btn--ghost" style={{ marginLeft: 8 }}>
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}