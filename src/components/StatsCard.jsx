const StatsDataItem = function({label = "", value = ""}) {
  return (
    <li className="d-flex align-items-center justify-content-between">
      <span>{label}</span>
      <span className='fw-bold'>{value}</span>
    </li>
  )
}

//"col-12 col-md-6 col-lg-4 mb-3"
const StatsCard = function({title = "", data = [], className = ""}) {
  return (
    <div className={className}>
      <div className="card">
        <div className="card-header">{title}</div>
        <ul className="card-body list-unstyled">
          {data.map(({label, value}, index) => {
            return <StatsDataItem key={index} label={label} value={value} />
          })}
        </ul>
      </div>
    </div>
  )
}

export default StatsCard;