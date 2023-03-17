const Table = function({titles = [], children = ""}) {
  return (
    <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              {titles.map((title, index) => <td key={index}>{title}</td>)}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
  )
}

export default Table;