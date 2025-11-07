import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockPostulantes, cursos } from '../data/mock_postulantes';
import Toast from '../components/toast';

const PostulantesPageMejorada = () => {
    const { codigoCurso } = useParams();
    const navigate = useNavigate();
    
    const [postulantes, setPostulantes] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'grade', direction: 'desc' });
    const [selectedForComparison, setSelectedForComparison] = useState([]);
    const [curso, setCurso] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const postulantesCurso = mockPostulantes.filter(p => p.course === codigoCurso);
        setPostulantes(postulantesCurso);
        
        const cursoInfo = cursos.find(c => c.codigo === codigoCurso);
        setCurso(cursoInfo);
    }, [codigoCurso]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const sortedPostulantes = [...postulantes].sort((a, b) => {
        if (sortConfig.key === 'name') {
            return sortConfig.direction === 'asc' 
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }
        
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (sortConfig.direction === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const toggleComparison = (postulante) => {
        const isSelected = selectedForComparison.some(p => p.id === postulante.id);
        
        if (isSelected) {
            setSelectedForComparison(selectedForComparison.filter(p => p.id !== postulante.id));
            showToast(`${postulante.name} removido de la comparación`, 'info');
        } else {
            if (selectedForComparison.length < 3) {
                setSelectedForComparison([...selectedForComparison, postulante]);
                showToast(`${postulante.name} agregado para comparar`, 'success');
            } else {
                showToast('Solo puedes seleccionar hasta 3 candidatos', 'warning');
            }
        }
    };

    const togglePreseleccion = (postulanteId, event) => {
        event.stopPropagation(); // Evitar que se active el link
        
        setPostulantes(postulantes.map(p => {
            if (p.id === postulanteId) {
                const nuevoEstado = !p.isPreselected;
                
                // Actualizar en mock data global
                const postulante = mockPostulantes.find(mp => mp.id === postulanteId);
                if (postulante) {
                    postulante.isPreselected = nuevoEstado;
                }
                
                // Mostrar notificación clara
                if (nuevoEstado) {
                    showToast(`✓ ${p.name} ha sido PRESELECCIONADO exitosamente`, 'success');
                } else {
                    showToast(`${p.name} removido de preseleccionados`, 'warning');
                }
                
                return { ...p, isPreselected: nuevoEstado };
            }
            return p;
        }));
    };

    const irAComparacion = () => {
        if (selectedForComparison.length === 0) {
            showToast('Selecciona al menos un candidato para comparar', 'warning');
            return;
        }
        const ids = selectedForComparison.map(p => p.id).join(',');
        navigate(`/comparacion?ids=${ids}`);
    };

    if (!curso) {
        return <div className="text-center py-12">Cargando...</div>;
    }

    return (
        <div>
            {/* Toast de notificación */}
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Header con navegación */}
            <div className="mb-6">
                <Link to="/" className="text-usm-blue hover:text-usm-light font-medium text-sm mb-2 inline-block">
                    ← Volver al Dashboard
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">{curso.nombre}</h1>
                        <p className="text-gray-600 mt-1">Código: {curso.codigo} | Semestre: {curso.semestre}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {postulantes.length} postulantes | {curso.cuposAyudantes} cupos disponibles
                        </p>
                    </div>
                    
                    {selectedForComparison.length > 0 && (
                        <button
                            onClick={irAComparacion}
                            className="bg-usm-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-usm-light transition-colors shadow-lg flex items-center space-x-2"
                        >
                            <span>📊</span>
                            <span>Comparar Seleccionados ({selectedForComparison.length})</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Controles de ordenamiento */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mr-3">Ordenar por:</label>
                        <select 
                            value={`${sortConfig.key}_${sortConfig.direction}`}
                            onChange={(e) => {
                                const [key, direction] = e.target.value.split('_');
                                setSortConfig({ key, direction });
                            }}
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-usm-blue focus:border-transparent"
                        >
                            <option value="grade_desc">Nota en el Curso (Mayor a Menor)</option>
                            <option value="grade_asc">Nota en el Curso (Menor a Mayor)</option>
                            <option value="promedioGeneral_desc">Promedio General (Mayor a Menor)</option>
                            <option value="promedioGeneral_asc">Promedio General (Menor a Mayor)</option>
                            <option value="progress_desc">Avance (Mayor a Menor)</option>
                            <option value="progress_asc">Avance (Menor a Mayor)</option>
                            <option value="experience_desc">Experiencia Total (Mayor a Menor)</option>
                            <option value="experienciaEnEsteCurso_desc">Experiencia en Este Curso (Mayor a Menor)</option>
                            <option value="name_asc">Nombre (A-Z)</option>
                            <option value="name_desc">Nombre (Z-A)</option>
                        </select>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                        {selectedForComparison.length > 0 && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                {selectedForComparison.length} seleccionado{selectedForComparison.length > 1 ? 's' : ''} para comparar
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabla de Postulantes MEJORADA */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                                    Comparar
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center">
                                        Nombre
                                        {sortConfig.key === 'name' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('grade')}
                                >
                                    <div className="flex items-center justify-center">
                                        Nota Curso
                                        {sortConfig.key === 'grade' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('promedioGeneral')}
                                >
                                    <div className="flex items-center justify-center">
                                        Promedio General
                                        {sortConfig.key === 'promedioGeneral' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('progress')}
                                >
                                    <div className="flex items-center justify-center">
                                        Avance
                                        {sortConfig.key === 'progress' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Experiencia
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones Rápidas
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedPostulantes.map(postulante => {
                                const isSelectedForComparison = selectedForComparison.some(p => p.id === postulante.id);
                                
                                return (
                                    <tr 
                                        key={postulante.id} 
                                        className={`hover:bg-gray-50 transition-colors ${isSelectedForComparison ? 'bg-blue-50' : ''} ${postulante.isPreselected ? 'bg-yellow-50' : ''}`}
                                    >
                                        {/* Checkbox para comparar */}
                                        <td className="px-4 py-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isSelectedForComparison}
                                                onChange={() => toggleComparison(postulante)}
                                                className="h-4 w-4 text-usm-blue focus:ring-usm-blue border-gray-300 rounded cursor-pointer"
                                            />
                                        </td>
                                        
                                        {/* Nombre */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{postulante.name}</div>
                                                    <div className="text-xs text-gray-500">{postulante.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Nota en el Curso */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                postulante.grade >= 90 ? 'bg-green-100 text-green-800' :
                                                postulante.grade >= 85 ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {postulante.grade}
                                            </span>
                                        </td>
                                        
                                        {/* Promedio General - NUEVO */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex flex-col items-center">
                                                <span className={`text-sm font-bold ${
                                                    postulante.promedioGeneral >= 85 ? 'text-green-600' :
                                                    postulante.promedioGeneral >= 75 ? 'text-blue-600' :
                                                    'text-gray-600'
                                                }`}>
                                                    {postulante.promedioGeneral}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {postulante.cursosAprobados}/{postulante.cursosTotales} ramos
                                                </span>
                                            </div>
                                        </td>
                                        
                                        {/* Avance */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-medium text-gray-900">{postulante.progress}%</span>
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                                                    <div 
                                                        className="bg-usm-blue h-2 rounded-full" 
                                                        style={{ width: `${postulante.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Experiencia - MEJORADO */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-bold text-gray-900">
                                                    {postulante.experience} total
                                                </span>
                                                <span className={`text-xs font-semibold ${
                                                    postulante.experienciaEnEsteCurso > 0 ? 'text-green-600' : 'text-gray-500'
                                                }`}>
                                                    {postulante.experienciaEnEsteCurso > 0 
                                                        ? `✓ ${postulante.experienciaEnEsteCurso} en este curso`
                                                        : 'Sin exp. en este curso'
                                                    }
                                                </span>
                                            </div>
                                        </td>
                                        
                                        {/* Estado */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {postulante.status === 'Ayudante Aceptado' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ Aceptado
                                                </span>
                                            ) : postulante.status === 'Rechazado Final' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    ✗ Rechazado
                                                </span>
                                            ) : postulante.isPreselected ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    ★ Preseleccionado
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Postulante
                                                </span>
                                            )}
                                        </td>
                                        
                                        {/* Acciones Rápidas - MEJORADO */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex flex-col space-y-2">
                                                <Link
                                                    to={`/postulante/${postulante.id}`}
                                                    className="text-usm-blue hover:text-usm-light font-medium text-sm"
                                                >
                                                    👤 Ver Perfil
                                                </Link>
                                                {postulante.status === 'Postulante' && (
                                                    <button
                                                        onClick={(e) => togglePreseleccion(postulante.id, e)}
                                                        className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
                                                            postulante.isPreselected 
                                                                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                        }`}
                                                    >
                                                        {postulante.isPreselected ? '✗ Quitar' : '★ Preseleccionar'}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {postulantes.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No hay postulantes para este curso</p>
                </div>
            )}

            {/* Leyenda de métricas */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">📊 Explicación de Métricas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-800">
                    <div><strong>Nota Curso:</strong> Calificación obtenida en este ramo específico</div>
                    <div><strong>Promedio General:</strong> Promedio ponderado de todos los ramos cursados</div>
                    <div><strong>Avance:</strong> Porcentaje de malla curricular completada</div>
                    <div><strong>Experiencia Total:</strong> Semestres como ayudante en cualquier curso</div>
                    <div><strong>Exp. en Este Curso:</strong> Semestres específicamente como ayudante de este ramo</div>
                    <div><strong>★ Botón directo:</strong> Preselecciona sin entrar al perfil completo</div>
                </div>
            </div>
        </div>
    );
};

export default PostulantesPageMejorada;
