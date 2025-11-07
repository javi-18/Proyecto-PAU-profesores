export default function Table({ columns, rows, renderActions }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>{columns.map(c => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              {r.cells.map((cell, i) => <td key={i}>{cell}</td>)}
              {renderActions && <td>{renderActions(r)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
