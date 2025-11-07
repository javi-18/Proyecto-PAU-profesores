import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockPostulantes, cursos } from '../data/mock_postulantes';
import Notification from '../components/notification';

const PostulantesPage = () => {
    const { codigoCurso } = useParams();
    const navigate = useNavigate();
    
    const [postulantes, setPostulantes] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'grade', direction: 'desc' });
    const [selectedForComparison, setSelectedForComparison] = useState([]);
    const [curso, setCurso] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Cargar postulantes del curso
        const postulantesCurso = mockPostulantes.filter(p => p.course === codigoCurso);
        setPostulantes(postulantesCurso);
        
        // Cargar info del curso
        const cursoInfo = cursos.find(c => c.codigo === codigoCurso);
        setCurso(cursoInfo);
    }, [codigoCurso]);

    // Función para ordenar
    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    // Postulantes ordenados
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

    // Manejar selección para comparación
    const toggleComparison = (postulante) => {
        const isSelected = selectedForComparison.some(p => p.id === postulante.id);
        
        if (isSelected) {
            setSelectedForComparison(selectedForComparison.filter(p => p.id !== postulante.id));
        } else {
            if (selectedForComparison.length < 3) {
                setSelectedForComparison([...selectedForComparison, postulante]);
            } else {
                setNotification({
                    message: 'Solo puedes seleccionar hasta 3 candidatos para comparar',
                    type: 'warning'
                });
            }
        }
    };

    // Manejar preselección con notificación clara
    const togglePreseleccion = (postulanteId, nombrePostulante) => {
        const postulante = mockPostulantes.find(p => p.id === postulanteId);
        if (!postulante) return;

        const estabaPreseleccionado = postulante.isPreselected;
        postulante.isPreselected = !postulante.isPreselected;
        
        // Actualizar estado local para re-render inmediato
        setPostulantes(postulantes.map(p => {
            if (p.id === postulanteId) {
                return { ...p, isPreselected: !p.isPreselected };
            }
            return p;
        }));

        // Mostrar notificación clara
        if (!estabaPreseleccionado) {
            setNotification({
                message: `✓ ${nombrePostulante} ha sido PRESELECCIONADO. Ahora aparecerá en la sección "Decisión Final".`,
                type: 'success'
            });
        } else {
            setNotification({
                message: `Se quitó la preselección de ${nombrePostulante}.`,
                type: 'info'
            });
        }
    };

    // Ir a comparación
    const irAComparacion = () => {
        if (selectedForComparison.length === 0) {
            setNotification({
                message: 'Selecciona al menos un candidato para comparar',
                type: 'warning'
            });
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
            {/* Notificación */}
            {notification && (
                <Notification 
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
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
                    
                    {/* Botón de comparación */}
                    {selectedForComparison.length > 0 && (
                        <button
                            onClick={irAComparacion}
                            className="bg-usm-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-usm-light transition-colors shadow-lg"
                        >
                            Comparar Seleccionados ({selectedForComparison.length})
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
                            <option value="grade_desc">Nota del Curso (Mayor a Menor)</option>
                            <option value="grade_asc">Nota del Curso (Menor a Mayor)</option>
                            <option value="promedioGeneral_desc">Promedio General (Mayor a Menor)</option>
                            <option value="promedioGeneral_asc">Promedio General (Menor a Mayor)</option>
                            <option value="progress_desc">Avance (Mayor a Menor)</option>
                            <option value="progress_asc">Avance (Menor a Mayor)</option>
                            <option value="experience_desc">Experiencia Total (Mayor a Menor)</option>
                            <option value="experience_asc">Experiencia Total (Menor a Mayor)</option>
                            <option value="experienciaEnEsteCurso_desc">Exp. en Este Curso (Mayor a Menor)</option>
                            <option value="name_asc">Nombre (A-Z)</option>
                            <option value="name_desc">Nombre (Z-A)</option>
                        </select>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                        {selectedForComparison.length > 0 && (
                            <span>
                                {selectedForComparison.length} seleccionado{selectedForComparison.length > 1 ? 's' : ''} para comparar
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabla de Postulantes con nuevas métricas */}
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('grade')}
                                    title="Nota en este curso"
                                >
                                    <div className="flex flex-col items-center">
                                        <span>Nota Curso</span>
                                        {sortConfig.key === 'grade' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('promedioGeneral')}
                                    title="Promedio de todas las asignaturas"
                                >
                                    <div className="flex flex-col items-center">
                                        <span>Promedio</span>
                                        <span>General</span>
                                        {sortConfig.key === 'promedioGeneral' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('progress')}
                                >
                                    <div className="flex flex-col items-center">
                                        <span>Avance</span>
                                        {sortConfig.key === 'progress' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('experienciaEnEsteCurso')}
                                    title="Semestres como ayudante de ESTE curso"
                                >
                                    <div className="flex flex-col items-center">
                                        <span>Exp. en</span>
                                        <span>Este Curso</span>
                                        {sortConfig.key === 'experienciaEnEsteCurso' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('experience')}
                                    title="Experiencia total como ayudante"
                                >
                                    <div className="flex flex-col items-center">
                                        <span>Exp. Total</span>
                                        {sortConfig.key === 'experience' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedPostulantes.map(postulante => {
                                const isSelectedForComparison = selectedForComparison.some(p => p.id === postulante.id);
                                
                                return (
                                    <tr 
                                        key={postulante.id} 
                                        className={`hover:bg-gray-50 transition-colors ${
                                            isSelectedForComparison ? 'bg-blue-50' : ''
                                        } ${postulante.isPreselected ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''}`}
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
                                                    <div className="text-xs text-gray-500">{postulante.rut}</div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Contacto */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{postulante.email}</div>
                                            <div className="text-xs text-gray-500">{postulante.phone}</div>
                                        </td>
                                        
                                        {/* Nota del Curso */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                postulante.grade >= 90 ? 'bg-green-100 text-green-800' :
                                                postulante.grade >= 85 ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {postulante.grade}
                                            </span>
                                        </td>

                                        {/* Promedio General */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                postulante.promedioGeneral >= 85 ? 'bg-green-100 text-green-800' :
                                                postulante.promedioGeneral >= 75 ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {postulante.promedioGeneral}
                                            </span>
                                        </td>
                                        
                                        {/* Avance */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-medium text-gray-900">{postulante.progress}%</span>
                                                <div className="text-xs text-gray-500">{postulante.cursosAprobados}/{postulante.cursosTotales}</div>
                                            </div>
                                        </td>

                                        {/* Experiencia en Este Curso */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`text-lg font-bold ${
                                                postulante.experienciaEnEsteCurso > 0 ? 'text-green-600' : 'text-gray-400'
                                            }`}>
                                                {postulante.experienciaEnEsteCurso}
                                            </span>
                                            <div className="text-xs text-gray-500">
                                                {postulante.experienciaEnEsteCurso === 1 ? 'sem.' : 'sems.'}
                                            </div>
                                        </td>
                                        
                                        {/* Experiencia Total */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-sm font-medium text-gray-900">{postulante.experience}</span>
                                            <div className="text-xs text-gray-500">
                                                {postulante.experience === 1 ? 'sem.' : 'sems.'}
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
                                        
                                        {/* Acciones - BOTÓN DE PRESELECCIÓN MÁS PROMINENTE */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex flex-col space-y-2">
                                                <Link
                                                    to={`/postulante/${postulante.id}`}
                                                    className="text-usm-blue hover:text-usm-light font-medium text-sm"
                                                    title="Ver detalles"
                                                >
                                                    Ver Perfil
                                                </Link>
                                                {postulante.status === 'Postulante' && (
                                                    <button
                                                        onClick={() => togglePreseleccion(postulante.id, postulante.name)}
                                                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                                                            postulante.isPreselected 
                                                                ? 'bg-red-100 text-red-700 hover:bg-red-200 border-2 border-red-300' 
                                                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-2 border-yellow-300'
                                                        }`}
                                                        title={postulante.isPreselected ? 'Quitar preselección' : 'Preseleccionar candidato'}
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
        </div>
    );
};

export default PostulantesPage;
    
    const [postulantes, setPostulantes] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'grade', direction: 'desc' });
    const [selectedForComparison, setSelectedForComparison] = useState([]);
    const [curso, setCurso] = useState(null);

    useEffect(() => {
        // Cargar postulantes del curso
        const postulantesCurso = mockPostulantes.filter(p => p.course === codigoCurso);
        setPostulantes(postulantesCurso);
        
        // Cargar info del curso
        const cursoInfo = cursos.find(c => c.codigo === codigoCurso);
        setCurso(cursoInfo);
    }, [codigoCurso]);

    // Función para ordenar
    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    // Postulantes ordenados
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

    // Manejar selección para comparación
    const toggleComparison = (postulante) => {
        const isSelected = selectedForComparison.some(p => p.id === postulante.id);
        
        if (isSelected) {
            setSelectedForComparison(selectedForComparison.filter(p => p.id !== postulante.id));
        } else {
            if (selectedForComparison.length < 3) {
                setSelectedForComparison([...selectedForComparison, postulante]);
            } else {
                alert('Solo puedes seleccionar hasta 3 candidatos para comparar');
            }
        }
    };

    // Manejar preselección
    const togglePreseleccion = (postulanteId) => {
        setPostulantes(postulantes.map(p => {
            if (p.id === postulanteId) {
                return { ...p, isPreselected: !p.isPreselected };
            }
            return p;
        }));
        
        // Actualizar en mock data
        const postulante = mockPostulantes.find(p => p.id === postulanteId);
        if (postulante) {
            postulante.isPreselected = !postulante.isPreselected;
        }
    };

    // Ir a comparación
    const irAComparacion = () => {
        if (selectedForComparison.length === 0) {
            alert('Selecciona al menos un candidato para comparar');
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
                    
                    {/* Botón de comparación */}
                    {selectedForComparison.length > 0 && (
                        <button
                            onClick={irAComparacion}
                            className="bg-usm-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-usm-light transition-colors shadow-lg"
                        >
                            Comparar Seleccionados ({selectedForComparison.length})
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
                            <option value="grade_desc">Nota (Mayor a Menor)</option>
                            <option value="grade_asc">Nota (Menor a Mayor)</option>
                            <option value="progress_desc">Avance (Mayor a Menor)</option>
                            <option value="progress_asc">Avance (Menor a Mayor)</option>
                            <option value="experience_desc">Experiencia (Mayor a Menor)</option>
                            <option value="experience_asc">Experiencia (Menor a Mayor)</option>
                            <option value="name_asc">Nombre (A-Z)</option>
                            <option value="name_desc">Nombre (Z-A)</option>
                        </select>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                        {selectedForComparison.length > 0 && (
                            <span>
                                {selectedForComparison.length} seleccionado{selectedForComparison.length > 1 ? 's' : ''} para comparar
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabla de Postulantes */}
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('grade')}
                                >
                                    <div className="flex items-center justify-center">
                                        Nota
                                        {sortConfig.key === 'grade' && (
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
                                <th 
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('experience')}
                                >
                                    <div className="flex items-center justify-center">
                                        Experiencia
                                        {sortConfig.key === 'experience' && (
                                            <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedPostulantes.map(postulante => {
                                const isSelectedForComparison = selectedForComparison.some(p => p.id === postulante.id);
                                
                                return (
                                    <tr 
                                        key={postulante.id} 
                                        className={`hover:bg-gray-50 transition-colors ${isSelectedForComparison ? 'bg-blue-50' : ''}`}
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
                                                    <div className="text-xs text-gray-500">{postulante.rut}</div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Contacto */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{postulante.email}</div>
                                            <div className="text-xs text-gray-500">{postulante.phone}</div>
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
                                                <span className="text-sm font-medium text-gray-900">{postulante.progress}%</span>
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                                                    <div 
                                                        className="bg-usm-blue h-2 rounded-full" 
                                                        style={{ width: `${postulante.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Experiencia */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="text-sm text-gray-900">{postulante.experience} sem.</span>
                                        </td>
                                        
                                        {/* Estado */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {postulante.status === 'Ayudante Aceptado' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Aceptado
                                                </span>
                                            ) : postulante.status === 'Rechazado Final' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    Rechazado
                                                </span>
                                            ) : postulante.isPreselected ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Preseleccionado
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Postulante
                                                </span>
                                            )}
                                        </td>
                                        
                                        {/* Acciones */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex justify-center space-x-2">
                                                <Link
                                                    to={`/postulante/${postulante.id}`}
                                                    className="text-usm-blue hover:text-usm-light"
                                                    title="Ver detalles"
                                                >
                                                    Ver
                                                </Link>
                                                {postulante.status === 'Postulante' && (
                                                    <button
                                                        onClick={() => togglePreseleccion(postulante.id)}
                                                        className={`font-medium ${
                                                            postulante.isPreselected 
                                                                ? 'text-red-600 hover:text-red-900' 
                                                                : 'text-yellow-600 hover:text-yellow-900'
                                                        }`}
                                                        title={postulante.isPreselected ? 'Quitar preselección' : 'Preseleccionar'}
                                                    >
                                                        {postulante.isPreselected ? 'Quitar' : 'Preseleccionar'}
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
        </div>
    );
};

export default PostulantesPage;
