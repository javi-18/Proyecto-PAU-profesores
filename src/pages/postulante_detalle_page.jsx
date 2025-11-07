import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockPostulantes } from '../data/mock_postulantes';

const PostulanteDetallePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const postulante = mockPostulantes.find(p => p.id === parseInt(id));

    if (!postulante) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Postulante no encontrado</p>
                <Link to="/" className="text-usm-blue hover:text-usm-light mt-4 inline-block">
                    ← Volver al Dashboard
                </Link>
            </div>
        );
    }

    const togglePreseleccion = () => {
        postulante.isPreselected = !postulante.isPreselected;
        navigate(`/postulantes/${postulante.course}`);
    };

    return (
        <div>
            {/* Header con navegación */}
            <div className="mb-6">
                <Link 
                    to={`/postulantes/${postulante.course}`} 
                    className="text-usm-blue hover:text-usm-light font-medium text-sm mb-2 inline-block"
                >
                    ← Volver a la lista de postulantes
                </Link>
            </div>

            {/* Información principal */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header del perfil */}
                <div className="bg-usm-blue text-white px-8 py-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">{postulante.name}</h1>
                            <p className="text-blue-100 mt-1">{postulante.courseName} ({postulante.course})</p>
                        </div>
                        
                        {/* Badge de estado CON PRESELECCIÓN VISIBLE */}
                        <div className="flex flex-col items-end space-y-2">
                            {postulante.status === 'Ayudante Aceptado' ? (
                                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-500 text-white">
                                    ✓ Aceptado
                                </span>
                            ) : postulante.status === 'Rechazado Final' ? (
                                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-500 text-white">
                                    ✗ Rechazado
                                </span>
                            ) : (
                                <>
                                    {postulante.isPreselected && (
                                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-yellow-400 text-gray-900 shadow-lg animate-pulse">
                                            ★ PRESELECCIONADO
                                        </span>
                                    )}
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gray-200 text-gray-700">
                                        {postulante.isPreselected ? 'Pendiente Decisión' : 'Postulante'}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenido del perfil */}
                <div className="p-8">
                    {/* Grid de información básica */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Columna izquierda */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Información Personal</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">RUT:</span>
                                        <span className="text-gray-900">{postulante.rut}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Email:</span>
                                        <span className="text-usm-blue">{postulante.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Teléfono:</span>
                                        <span className="text-gray-900">{postulante.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Motivación</h2>
                                <p className="text-gray-700 leading-relaxed">{postulante.motivacion}</p>
                            </div>
                        </div>

                        {/* Columna derecha */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Desempeño Académico</h2>
                                
                                {/* Nota en el Curso */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600 font-medium">Nota en el Curso:</span>
                                        <span className={`text-3xl font-bold ${
                                            postulante.grade >= 90 ? 'text-green-600' :
                                            postulante.grade >= 85 ? 'text-blue-600' :
                                            'text-yellow-600'
                                        }`}>
                                            {postulante.grade}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className={`h-3 rounded-full ${
                                                postulante.grade >= 90 ? 'bg-green-500' :
                                                postulante.grade >= 85 ? 'bg-blue-500' :
                                                'bg-yellow-500'
                                            }`}
                                            style={{ width: `${postulante.grade}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Promedio General - NUEVO */}
                                {postulante.promedioGeneral && (
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600 font-medium">Promedio General:</span>
                                            <span className={`text-3xl font-bold ${
                                                postulante.promedioGeneral >= 85 ? 'text-green-600' :
                                                postulante.promedioGeneral >= 75 ? 'text-blue-600' :
                                                'text-gray-600'
                                            }`}>
                                                {postulante.promedioGeneral}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className={`h-3 rounded-full ${
                                                    postulante.promedioGeneral >= 85 ? 'bg-green-500' :
                                                    postulante.promedioGeneral >= 75 ? 'bg-blue-500' :
                                                    'bg-gray-500'
                                                }`}
                                                style={{ width: `${postulante.promedioGeneral}%` }}
                                            ></div>
                                        </div>
                                        {postulante.cursosAprobados && postulante.cursosTotales && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {postulante.cursosAprobados} de {postulante.cursosTotales} ramos aprobados
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Avance Curricular */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600 font-medium">Avance Curricular:</span>
                                        <span className="text-2xl font-bold text-usm-blue">{postulante.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-usm-blue h-3 rounded-full"
                                            style={{ width: `${postulante.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Experiencia - MEJORADO */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600 font-medium">Experiencia como Ayudante:</span>
                                        <span className="text-2xl font-bold text-gray-900">
                                            {postulante.experience} {postulante.experience === 1 ? 'semestre' : 'semestres'}
                                        </span>
                                    </div>
                                    {postulante.experienciaEnEsteCurso !== undefined && postulante.experienciaEnEsteCurso > 0 ? (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                                            <p className="text-sm font-bold text-green-800">
                                                ✓ {postulante.experienciaEnEsteCurso} {postulante.experienciaEnEsteCurso === 1 ? 'semestre' : 'semestres'} como ayudante de ESTE CURSO específicamente
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 mt-1">Sin experiencia previa en este curso específico</p>
                                    )}
                                    {postulante.historialAyudantias && (
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-500 font-medium">Historial:</p>
                                            <p className="text-sm text-gray-700">{postulante.historialAyudantias}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comentarios adicionales */}
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Comentarios del Postulante</h2>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <p className="text-gray-700 leading-relaxed">{postulante.details}</p>
                        </div>
                    </div>

                    {/* Acciones */}
                    {postulante.status === 'Postulante' && (
                        <div className="border-t pt-6">
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={togglePreseleccion}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                        postulante.isPreselected
                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                    }`}
                                >
                                    {postulante.isPreselected ? 'Quitar Preselección' : 'Preseleccionar Candidato'}
                                </button>
                                
                                {postulante.isPreselected && (
                                    <Link
                                        to="/preselecciones"
                                        className="bg-usm-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-usm-light transition-colors"
                                    >
                                        Ir a Decisión Final
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Información adicional */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Próximos pasos</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                    <li>Preselecciona candidatos prometedores para revisión final</li>
                    <li>Compara candidatos para tomar una decisión informada</li>
                    <li>Toma la decisión final en la sección de "Preseleccionados"</li>
                </ul>
            </div>
        </div>
    );
};

export default PostulanteDetallePage;
