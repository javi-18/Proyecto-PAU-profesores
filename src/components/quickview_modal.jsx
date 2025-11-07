import { useStore } from "../state/store";

export default function QuickViewModal() {
  const { state, dispatch } = useStore();
  const p = state.postulantes.find(x => x.id === state.quickviewId);
  if (!p) return null;

  return (
    <div className="modal">
      <div className="modal__box">
        <h3>{p.name} · {p.course}</h3>
        <p>Nota: <b>{p.grade}</b> · Avance: {p.progress}% · Exp: {p.experience} sem.</p>
        <p className="muted">{p.details}</p>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:12}}>
          <button className="btn btn--ghost" onClick={()=>dispatch({type:"CLOSE_QV"})}>Cerrar</button>
          <button className="btn" onClick={()=>{
            dispatch({type:"ACCEPT_CANDIDATE", id:p.id});
            dispatch({type:"CLOSE_QV"});
          }}>Aceptar ayudante</button>
        </div>
      </div>
    </div>
  );
}
