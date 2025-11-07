const now = () => Math.floor(Math.random()*10)+1;

const base = [
  { id:1, name:"Javiera Bobadilla", course:"INF322", grade:92, progress:85, experience:3, details:"Top 10% del curso", contact:"javi@correo.cl" },
  { id:2, name:"Elías Valle",       course:"INF234", grade:88, progress:70, experience:2, details:"Buen desempeño en ayudantías", contact:"elias@correo.cl" },
  { id:3, name:"Sofía Núñez",       course:"INF322", grade:95, progress:90, experience:4, details:"Experiencia previa", contact:"sofia@correo.cl" },
];

const expand = (n, seedCourse) =>
  Array.from({length:n}, (_,i)=>({
    id:100+seedCourse.charCodeAt(3)+i,
    name:`Postulante ${seedCourse}-${i+1}`,
    course:seedCourse,
    grade: 70+now(),
    progress: 60+now(),
    experience: 1 + (now()%4),
    details:"—",
    contact:`p${i}@correo.cl`
  }));

const data = [
  ...base,
  ...expand(7, "INF322"),
  ...expand(5, "INF234"),
  ...expand(4, "INF280"),
].map(p => ({ ...p, status:"Postulante", isPreselected:false }));

export default data;
