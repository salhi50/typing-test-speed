import { BsGear } from 'react-icons/bs';
import { MdOutlineInsertChart } from 'react-icons/md';
import NavItem from '../components/NavItem';

const Header = function() {
  return <header className="py-1 bg-white shadow-sm border-bottom">
    <div className="container-lg d-flex justify-content-between align-items-center">
      <h5 className="mb-0 text-dark-emphasis">Typing Speed</h5>
      <ul className="list-unstyled mb-0 d-flex">
        <NavItem title="Stats" data-bs-toggle="modal" data-bs-target="#stats-modal">
          <MdOutlineInsertChart size="1.2em" />
        </NavItem>
        <NavItem title="Settings" data-bs-toggle="modal" data-bs-target="#settings-modal">
          <BsGear size="1.2em" />
        </NavItem>
      </ul>
    </div>
  </header>
}

export default Header;