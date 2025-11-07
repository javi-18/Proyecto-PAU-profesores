export default function KpiCard({ title, value, onClick }) {
  return (
    <div className={"card card--kpi" + (onClick ? " card--click" : "")} onClick={onClick}>
      <h3>{title}</h3>
      <b>{value}</b>
    </div>
  );
}
