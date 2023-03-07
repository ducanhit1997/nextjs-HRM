import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ModalLogin from "../modals/modalLogin";
import Link from "next/link";
import { useRouter } from 'next/router'

function Navbar() {
  const [showModalNewUser, setShowModalNewUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasToken = Cookies.get('HRM_TOKEN')
    setIsLogin(hasToken)
  }, [])

  const onLogout = () => {
    Cookies.remove('HRM_TOKEN')
    setIsLogin(false)
    router.push("/")
  }

  return (
    <div className='container'>
      <Nav className="justify-content-end align-items-center mt-2" activeKey="/home">
        {!isLogin &&
          <Nav.Item>
            <Button variant="outline-primary" onClick={() => setShowModalNewUser(true)}>Login</Button>
          </Nav.Item>
        }
        {isLogin &&
          <Nav.Item>
            <Dropdown align="end">
              <Dropdown.Toggle variant="" id="dropdown-basic">
                PDA
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link href="/profile">
                  <Dropdown.Item href="#/action-1">Manage Account</Dropdown.Item>
                </Link>
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        }
      </Nav>
      <ModalLogin
        show={showModalNewUser}
        onHide={() => setShowModalNewUser(false)}
        setShowModalNewUser={setShowModalNewUser}
      />
    </div>
  )
}
export default Navbar;
