import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mockPostulantes } from '../data/mock_postulantes';

const ComparacionPage = () => {
    const location = useLocation();
    const [candidatos, setCandidatos] = useState([]);

    useEffect(() => {
        // Obtener IDs de la query string
        const searchParams = new URLSearchParams(location.search);
        const idsString = searchParams.get('ids');
        
        if (idsString) {
            const ids = idsString.split(',').map(id => parseInt(id));
            const seleccionados = mockPostulantes.filter(p => ids.includes(p.id));
            setCandidatos(seleccionados);
        }
    }, [location]);

    if (candidatos.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No hay candidatos seleccionados para comparar</p>
                <Link to="/" className="text-usm-blue hover:text-usm-light font-medium">
                    ← Volver al Dashboard
                </Link>
            </div>
        );
    }

    // Categorías de comparación - ACTUALIZADO con nuevas métricas
    const categorias = [
        { key: 'name', label: 'Nombre', tipo: 'text' },
        { key: 'rut', label: 'RUT', tipo: 'text' },
        { key: 'email', label: 'Email', tipo: 'text' },
        { key: 'phone', label: 'Teléfono', tipo: 'text' },
        { key: 'grade', label: 'Nota en el Curso', tipo: 'numero', destacar: true },
        { key: 'promedioGeneral', label: 'Promedio General', tipo: 'numero', destacar: true },
        { key: 'progress', label: 'Avance Curricular (%)', tipo: 'numero', destacar: true },
        { key: 'cursosAprobados', label: 'Cursos Aprobados', tipo: 'text' },
        { key: 'experienciaEnEsteCurso', label: 'Experiencia en Este Curso (sem.)', tipo: 'numero', destacar: true },
        { key: 'experience', label: 'Experiencia Total (sem.)', tipo: 'numero', destacar: true },
        { key: 'historialAyudantias', label: 'Historial de Ayudantías', tipo: 'texto_largo' },
        { key: 'motivacion', label: 'Motivación', tipo: 'texto_largo' },
        { key: 'details', label: 'Comentarios', tipo: 'texto_largo' },
    ];

    // Encontrar el mejor valor para destacar
    const getMejorValor = (key, candidatos) => {
        if (key === 'grade' || key === 'progress' || key === 'experience') {
            return Math.max(...candidatos.map(c => c[key]));
        }
        return null;
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <Link to="/" className="text-usm-blue hover:text-usm-light font-medium text-sm mb-2 inline-block">
                    ← Volver al Dashboard
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900">Comparación de Candidatos</h1>
                <p className="text-gray-600 mt-1">Comparando {candidatos.length} candidatos lado a lado</p>
            </div>

            {/* Tabla de Comparación */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-usm-blue">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider w-1/4">
                                    Criterio
                                </th>
                                {candidatos.map(candidato => (
                                    <th 
                                        key={candidato.id} 
                                        className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider"
                                    >
                                        <div className="flex flex-col items-center">
                                            <span>{candidato.name.split(' ')[0]}</span>
                                            <span className="text-xs font-normal text-blue-100 mt-1">
                                                {candidato.name.split(' ').slice(1).join(' ')}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categorias.map((categoria, index) => {
                                const mejorValor = categoria.destacar ? getMejorValor(categoria.key, candidatos) : null;
                                
                                return (
                                    <tr key={categoria.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 bg-gray-100">
                                            {categoria.label}
                                        </td>
                                        {candidatos.map(candidato => {
                                            const valor = candidato[categoria.key];
                                            const esMejor = mejorValor !== null && valor === mejorValor;
                                            
                                            return (
                                                <td 
                                                    key={candidato.id} 
                                                    className={`px-6 py-4 text-center ${
                                                        esMejor ? 'bg-green-50' : ''
                                                    }`}
                                                >
                                                    {categoria.tipo === 'numero' ? (
                                                        <div className="flex flex-col items-center">
                                                            <span className={`text-2xl font-bold ${
                                                                esMejor ? 'text-green-600' : 'text-gray-900'
                                                            }`}>
                                                                {valor}
                                                            </span>
                                                            {esMejor && (
                                                                <span className="text-xs text-green-600 font-semibold mt-1">
                                                                    ★ Mejor
                                                                </span>
                                                            )}
                                                            {categoria.key === 'grade' && (
                                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                                    <div 
                                                                        className={`h-2 rounded-full ${
                                                                            valor >= 90 ? 'bg-green-500' :
                                                                            valor >= 85 ? 'bg-blue-500' :
                                                                            'bg-yellow-500'
                                                                        }`}
                                                                        style={{ width: `${valor}%` }}
                                                                    ></div>
                                                                </div>
                                                            )}
                                                            {categoria.key === 'progress' && (
                                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                                    <div 
                                                                        className="bg-usm-blue h-2 rounded-full"
                                                                        style={{ width: `${valor}%` }}
                                                                    ></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : categoria.tipo === 'texto_largo' ? (
                                                        <div className="text-left">
                                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                                {valor}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-900">{valor}</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                            
                            {/* Fila de estado */}
                            <tr className="bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                                    Estado Actual
                                </td>
                                {candidatos.map(candidato => (
                                    <td key={candidato.id} className="px-6 py-4 text-center">
                                        {candidato.status === 'Ayudante Aceptado' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                                ✓ Aceptado
                                            </span>
                                        ) : candidato.status === 'Rechazado Final' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                                                ✗ Rechazado
                                            </span>
                                        ) : candidato.isPreselected ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                                                ★ Preseleccionado
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-700">
                                                Postulante
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                            
                            {/* Fila de acciones */}
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                                    Acciones
                                </td>
                                {candidatos.map(candidato => (
                                    <td key={candidato.id} className="px-6 py-4 text-center">
                                        <div className="flex flex-col space-y-2">
                                            <Link
                                                to={`/postulante/${candidato.id}`}
                                                className="text-usm-blue hover:text-usm-light font-semibold text-sm"
                                            >
                                                Ver Perfil Completo
                                            </Link>
                                            {candidato.status === 'Postulante' && !candidato.isPreselected && (
                                                <button
                                                    onClick={() => {
                                                        candidato.isPreselected = true;
                                                        window.location.reload();
                                                    }}
                                                    className="text-yellow-600 hover:text-yellow-800 font-semibold text-sm"
                                                >
                                                    Preseleccionar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Resumen de comparación con puntaje mejorado */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {candidatos.map(candidato => {
                    // Cálculo mejorado: incluye promedio general y experiencia específica
                    const puntajeTotal = 
                        candidato.grade + 
                        candidato.promedioGeneral + 
                        candidato.progress + 
                        (candidato.experienciaEnEsteCurso * 10) +  // Experiencia en este curso vale más
                        (candidato.experience * 5);
                    const maxPuntaje = Math.max(...candidatos.map(c => 
                        c.grade + c.promedioGeneral + c.progress + (c.experienciaEnEsteCurso * 10) + (c.experience * 5)
                    ));
                    const esMejorOpcion = puntajeTotal === maxPuntaje;
                    
                    return (
                        <div 
                            key={candidato.id} 
                            className={`bg-white rounded-lg shadow p-6 ${
                                esMejorOpcion ? 'border-2 border-green-500' : 'border border-gray-200'
                            }`}
                        >
                            <h3 className="font-bold text-lg text-gray-900 mb-2">{candidato.name}</h3>
                            {esMejorOpcion && (
                                <div className="mb-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                        ★ Mejor Candidato Global
                                    </span>
                                </div>
                            )}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Puntaje Total:</span>
                                    <span className="font-bold text-gray-900">{puntajeTotal}</span>
                                </div>
                                <div className="text-xs text-gray-500 space-y-1 border-t pt-2">
                                    <div className="flex justify-between">
                                        <span>Nota Curso:</span>
                                        <span>{candidato.grade}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Prom. General:</span>
                                        <span>{candidato.promedioGeneral}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Avance:</span>
                                        <span>{candidato.progress}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-green-700">
                                        <span>Exp. Este Curso:</span>
                                        <span>{candidato.experienciaEnEsteCurso * 10} pts</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Exp. Total:</span>
                                        <span>{candidato.experience * 5} pts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Botones de acción */}
            <div className="mt-8 flex justify-between">
                <Link
                    to="/"
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                    Volver al Dashboard
                </Link>
                <Link
                    to="/preselecciones"
                    className="px-6 py-3 bg-usm-blue text-white rounded-lg font-semibold hover:bg-usm-light transition-colors"
                >
                    Ir a Decisión Final
                </Link>
            </div>
        </div>
    );
};

export default ComparacionPage;
