import React from 'react';
import { useNavigate } from "react-router-dom";
import { useStore } from "../state/store";
import KpiCard from "../components/kpi_card";
import CourseCard from "../components/Course_card";

export default function DashboardPage() {
  const { counts } = useStore();
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="section-title">Panel del Profesor</h2>
      <p className="muted">Resumen general de tus cursos y postulantes.</p>

      <div className="grid-cards">
        <KpiCard title="Total postulantes" value={counts.total} onClick={()=>navigate("/postulantes")} />
        <KpiCard title="Preseleccionados" value={counts.pre} onClick={()=>navigate("/preselecciones")} />
        <KpiCard title="Requieren atención" value={"—"} />
      </div>

      <h3 className="section-title" style={{marginTop:24}}>Cursos activos</h3>
      <div className="grid-courses">
        <CourseCard code="INF322" name="Interfaces Usuarias · 2025-1"
          meta={`${counts.porCurso("INF322")} postulantes`} onClick={()=>navigate("/postulantes?curso=INF322")} />
        <CourseCard code="INF234" name="Intro a la Programación · 2025-1"
          meta={`${counts.porCurso("INF234")} postulantes`} onClick={()=>navigate("/postulantes?curso=INF234")} />
        <CourseCard code="INF280" name="Estructuras de Datos · 2025-1"
          meta={`${counts.porCurso("INF280")} postulantes`} onClick={()=>navigate("/postulantes?curso=INF280")} />
      </div>
    </section>
  );
}
