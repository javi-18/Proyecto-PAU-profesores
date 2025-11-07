import React from 'react';
import { Link } from 'react-router-dom';
import { mockPostulantes, cursos } from '../data/mock_postulantes';

const DashboardPage = () => {
    // Calcular métricas
    const totalPostulantes = mockPostulantes.length;
    const cursosActivos = cursos.length;
    const totalPreseleccionados = mockPostulantes.filter(p => p.isPreselected).length;
    const totalAceptados = mockPostulantes.filter(p => p.status === 'Ayudante Aceptado').length;

    // Agrupar postulantes por curso
    const postulantesPorCurso = {};
    mockPostulantes.forEach(p => {
        if (!postulantesPorCurso[p.course]) {
            postulantesPorCurso[p.course] = [];
        }
        postulantesPorCurso[p.course].push(p);
    });

    return (
        <div>
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">Resumen General</h1>
                <p className="mt-2 text-gray-600">Panel de control para gestión de ayudantías</p>
            </header>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Cursos Activos */}
                <div className="bg-white rounded-lg shadow p-6 border-b-4 border-usm-blue">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{cursosActivos}</p>
                            <p className="text-xs text-gray-500 mt-1">Con proceso de ayudantías</p>
                        </div>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8 text-usm-blue" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M12 6.253v13m0-13C10.832 5.477 9.204 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.8 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.8 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.2 18 16.5 18s-3.332.477-4.5 1.253" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Total Postulantes */}
                <div className="bg-white rounded-lg shadow p-6 border-b-4 border-gray-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Postulantes</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalPostulantes}</p>
                            <p className="text-xs text-gray-500 mt-1">En todos los cursos</p>
                        </div>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8 text-gray-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                            />
                        </svg>
                    </div>
                </div>

                {/* Preseleccionados */}
                <Link 
                    to="/preselecciones" 
                    className="bg-white rounded-lg shadow p-6 border-b-4 border-yellow-400 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Preseleccionados</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalPreseleccionados}</p>
                            <p className="text-xs text-gray-500 mt-1">Pendientes de decisión final</p>
                        </div>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8 text-yellow-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                            />
                        </svg>
                    </div>
                </Link>

                {/* Ayudantes Aceptados */}
                <div className="bg-white rounded-lg shadow p-6 border-b-4 border-green-400">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Ayudantes Aceptados</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalAceptados}</p>
                            <p className="text-xs text-gray-500 mt-1">Confirmados para el semestre</p>
                        </div>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8 text-green-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Tabla de Cursos */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Cursos con Postulantes</h2>
                    <p className="text-sm text-gray-600 mt-1">Selecciona un curso para ver y gestionar sus postulantes</p>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Código
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre del Curso
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Semestre
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Postulantes
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cupos
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cursos.map(curso => {
                                const postulantes = postulantesPorCurso[curso.codigo] || [];
                                const aceptados = postulantes.filter(p => p.status === 'Ayudante Aceptado').length;
                                const preseleccionados = postulantes.filter(p => p.isPreselected).length;
                                const cuposRestantes = curso.cuposAyudantes - aceptados;
                                
                                return (
                                    <tr key={curso.codigo} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-usm-blue">{curso.codigo}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{curso.nombre}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">{curso.semestre}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {postulantes.length}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="text-sm text-gray-900">
                                                {aceptados}/{curso.cuposAyudantes}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {cuposRestantes === 0 ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Completo
                                                </span>
                                            ) : preseleccionados > 0 ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    En proceso
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Pendiente
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link 
                                                to={`/postulantes/${curso.codigo}`}
                                                className="text-usm-blue hover:text-usm-light font-semibold transition-colors"
                                            >
                                                Ver Postulantes →
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Ayuda rápida */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">¿Cómo funciona el proceso?</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                    <li>Selecciona un curso para ver sus postulantes en formato de tabla</li>
                    <li>Revisa los perfiles y preselecciona candidatos prometedores</li>
                    <li>Compara hasta 3 candidatos lado a lado en una tabla comparativa</li>
                    <li>Toma la decisión final en la sección de "Preseleccionados"</li>
                </ol>
            </div>
        </div>
    );
};

export default DashboardPage;
