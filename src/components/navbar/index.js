import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ModalLogin from "../modals/modalLogin";
import Link from "next/link";
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode';

function Navbar() {
  const [showModalNewUser, setShowModalNewUser] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const hasToken = Cookies.get('HRM_TOKEN')
    if (hasToken) {
      const tokenPayload = jwt_decode(hasToken);
      setUserName(tokenPayload.username)
    }
    setIsLogin(hasToken)
  }, [])

  const onLogout = () => {
    Cookies.remove('HRM_TOKEN')
    setIsLogin(false)
    router.push("/")
  }

  return (
    <div>
      <Nav className="container mt-2 w-100" activeKey="/home">
        <Nav.Item className="float-start">
          <Nav.Link eventKey="1" href="/">
            Home
          </Nav.Link>
        </Nav.Item>
        {!isLogin &&
          <Nav.Item className="ms-auto">
            <Button variant="outline-primary" onClick={() => setShowModalNewUser(true)}>Login</Button>
          </Nav.Item>
        }
        {isLogin &&
          <Nav.Item className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle variant="" id="dropdown-basic">
                {userName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link href="/profile">
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
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
