import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockPostulantes } from '../data/mock_postulantes';

const PreseleccionesPage = () => {
    const [preseleccionados, setPreseleccionados] = useState([]);

    useEffect(() => {
        // Obtener solo los preseleccionados
        const candidatosPreseleccionados = mockPostulantes.filter(p => p.isPreselected);
        setPreseleccionados(candidatosPreseleccionados);
    }, []);

    const handleDecision = (postulanteId, decision) => {
        // Confirmar la acción
        const postulante = mockPostulantes.find(p => p.id === postulanteId);
        const mensaje = decision === 'aceptar' 
            ? `¿Confirmas que deseas ACEPTAR a ${postulante.name} como ayudante?`
            : `¿Confirmas que deseas RECHAZAR a ${postulante.name}?`;
        
        if (window.confirm(mensaje)) {
            // Actualizar estado
            postulante.status = decision === 'aceptar' ? 'Ayudante Aceptado' : 'Rechazado Final';
            postulante.isPreselected = false;
            
            // Recargar la lista
            const candidatosPreseleccionados = mockPostulantes.filter(p => p.isPreselected);
            setPreseleccionados(candidatosPreseleccionados);
            
            // Mostrar mensaje
            const tipoMensaje = decision === 'aceptar' ? 'success' : 'info';
            alert(`✓ Decisión registrada: ${postulante.name} ha sido ${decision === 'aceptar' ? 'aceptado' : 'rechazado'}.`);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <Link to="/" className="text-usm-blue hover:text-usm-light font-medium text-sm mb-2 inline-block">
                    ← Volver al Dashboard
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900">Decisión Final</h1>
                <p className="text-gray-600 mt-1">
                    {preseleccionados.length} candidato{preseleccionados.length !== 1 ? 's' : ''} preseleccionado{preseleccionados.length !== 1 ? 's' : ''} pendiente{preseleccionados.length !== 1 ? 's' : ''} de decisión final
                </p>
            </div>

            {preseleccionados.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <svg 
                        className="mx-auto h-16 w-16 text-gray-400 mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay candidatos preseleccionados</h3>
                    <p className="text-gray-600 mb-6">
                        Dirígete a la lista de postulantes de cada curso para preseleccionar candidatos.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-usm-blue text-white rounded-lg font-semibold hover:bg-usm-light transition-colors"
                    >
                        Ir al Dashboard
                    </Link>
                </div>
            ) : (
                <>
                    {/* Tabla de preseleccionados */}
                    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-yellow-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Candidato
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Curso
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Nota
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Avance
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Experiencia
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Contacto
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Decisión
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {preseleccionados.map(postulante => (
                                        <tr key={postulante.id} className="hover:bg-gray-50 transition-colors">
                                            {/* Candidato */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {postulante.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">{postulante.rut}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* Curso */}
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-usm-blue">
                                                    {postulante.course}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    {postulante.courseName}
                                                </div>
                                            </td>
                                            
                                            {/* Nota */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                    postulante.grade >= 90 ? 'bg-green-100 text-green-800' :
                                                    postulante.grade >= 85 ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {postulante.grade}
                                                </span>
                                            </td>
                                            
                                            {/* Avance */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {postulante.progress}%
                                                    </span>
                                                </div>
                                            </td>
                                            
                                            {/* Experiencia */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="text-sm text-gray-900">
                                                    {postulante.experience} sem.
                                                </span>
                                            </td>
                                            
                                            {/* Contacto */}
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{postulante.email}</div>
                                                <div className="text-xs text-gray-500">{postulante.phone}</div>
                                            </td>
                                            
                                            {/* Decisión */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex flex-col space-y-2">
                                                    <Link
                                                        to={`/postulante/${postulante.id}`}
                                                        className="text-xs text-usm-blue hover:text-usm-light font-medium"
                                                    >
                                                        Ver Perfil
                                                    </Link>
                                                    <div className="flex justify-center space-x-2">
                                                        <button
                                                            onClick={() => handleDecision(postulante.id, 'aceptar')}
                                                            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600 transition-colors"
                                                            title="Aceptar como ayudante"
                                                        >
                                                            ✓ Aceptar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDecision(postulante.id, 'rechazar')}
                                                            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors"
                                                            title="Rechazar candidatura"
                                                        >
                                                            ✗ Rechazar
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-yellow-900 mb-2">Instrucciones</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                            <li>Revisa cuidadosamente el perfil completo de cada candidato antes de tomar una decisión</li>
                            <li>Una vez que aceptes o rechaces a un candidato, la decisión será definitiva</li>
                            <li>Los candidatos aceptados serán notificados automáticamente por correo electrónico</li>
                            <li>Puedes comparar candidatos antes de tomar tu decisión final</li>
                        </ul>
                    </div>

                    {/* Resumen de decisiones */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Pendientes</p>
                                    <p className="text-3xl font-bold text-yellow-600 mt-1">
                                        {preseleccionados.length}
                                    </p>
                                </div>
                                <svg 
                                    className="h-12 w-12 text-yellow-400" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Aceptados</p>
                                    <p className="text-3xl font-bold text-green-600 mt-1">
                                        {mockPostulantes.filter(p => p.status === 'Ayudante Aceptado').length}
                                    </p>
                                </div>
                                <svg 
                                    className="h-12 w-12 text-green-400" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Rechazados</p>
                                    <p className="text-3xl font-bold text-red-600 mt-1">
                                        {mockPostulantes.filter(p => p.status === 'Rechazado Final').length}
                                    </p>
                                </div>
                                <svg 
                                    className="h-12 w-12 text-red-400" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PreseleccionesPage;
