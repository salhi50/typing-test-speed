const Modal = function(props) {

  const {
    id = "",
    title = "",
    dialogClass = "",
    children = ""
  } = props;

  return <div className="modal fade" id={id}>
    <div className={`modal-dialog ${dialogClass}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button className="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  </div>
}

export default Modal;