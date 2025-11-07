import { useStore } from "../state/store";

export default function CompareModal() {
  const { state, dispatch } = useStore();
  if (!state.showCompare) return null;

  const items = state.postulantes.filter(p => state.comparing.includes(p.id));
  return (
    <div className="modal">
      <div className="modal__box">
        <h3>Comparar candidatos</h3>
        <div className="grid-cards">
          {items.map(p => (
            <div className="card" key={p.id}>
              <b>{p.name}</b>
              <p className="muted">{p.course}</p>
              <p>Nota: <b>{p.grade}</b></p>
              <p>Avance: {p.progress}%</p>
              <p>Experiencia: {p.experience} sem.</p>
            </div>
          ))}
        </div>
        <div style={{marginTop:12, textAlign:"right"}}>
          <button className="btn" onClick={()=>dispatch({type:"CLOSE_COMPARE"})}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
