import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { logout as adminLogout } from "../../slices/adminAuthSlice";

const AdminHeader = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [triggerLogout] = useAdminLogoutMutation();

  const handleLogout = async () => {
    try {
      await triggerLogout().unwrap();
      dispatch(adminLogout());
      navigate("/admin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/admin">
            <Navbar.Brand>Admin Panel</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="ms-auto">
              {adminInfo ? (
                <NavDropdown title={adminInfo.name} id="admin-menu">
                  <LinkContainer to="/admin/profile">
                    <NavDropdown.Item >My Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/admin/login">
                    <Nav.Link>
                      <FaSignInAlt /> Login
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/admin/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Register
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/">
                    <Nav.Link>
                      <FaSignOutAlt /> User Area
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

export default AdminHeader;
