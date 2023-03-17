const NavItem = function(props) {

  const {title = "", children, ...attrs} = props;

  return <li className="nav-item">
    <button className="btn btn-light d-flex align-items-center btn-sm fs-6" {...attrs}>
      {children}
      <span className='ms-2'>{title}</span>
    </button>
  </li>
}

export default NavItem;