import { useState } from "react";

import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import NewUserModal from "../../components/modals/newUser";

function Navbar() {
  const [showModalNewUser, setShowModalNewUser] = useState(false);

  return (
    <div className='container'>
      <Nav className="justify-content-end align-items-center mt-2" activeKey="/home">
        <Nav.Item>
          <Button variant="outline-primary" onClick={() => setShowModalNewUser(true)}>Login</Button>
        </Nav.Item>

        <Nav.Item>
          <Dropdown align="end">
            <Dropdown.Toggle variant="" id="dropdown-basic">
              PDA
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Manage Account</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      </Nav>
      <NewUserModal
        show={showModalNewUser}
        onHide={() => setShowModalNewUser(false)}
      />
    </div>
  )
}
export default Navbar;
