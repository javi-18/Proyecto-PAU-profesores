export default function CourseCard({ code, name, meta, onClick }) {
  return (
    <div className="card card--click" onClick={onClick}>
      <b>{code}</b>
      <p>{name}</p>
      <small>{meta}</small>
    </div>
  );
}
