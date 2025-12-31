import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout as logoutAction } from "../../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutRequest] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutRequest().unwrap();
      dispatch(logoutAction());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>User</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="user-menu">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={handleLogout} >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Login
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Register
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/admin">
                    <Nav.Link>
                      <FaSignInAlt /> Admin
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
