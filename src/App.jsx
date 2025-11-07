import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import DashboardPage from './pages/dashboard_page';
import PostulantesPageMejorada from './pages/postulantes_page_mejorada';
import PostulanteDetallePage from './pages/postulante_detalle_page';
import ComparacionPage from './pages/comparacion_page';
import PreseleccionesPage from './pages/preselecciones_page';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/postulantes/:codigoCurso" element={<PostulantesPageMejorada />} />
                    <Route path="/postulante/:id" element={<PostulanteDetallePage />} />
                    <Route path="/comparacion" element={<ComparacionPage />} />
                    <Route path="/preselecciones" element={<PreseleccionesPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
