import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const AdminHero = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);

  return (
    <section className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 text-center shadow-sm w-75">
          {adminInfo ? (
            <>
              <h2 className="mb-3">Welcome, {adminInfo.name} 👋</h2>
              <p className="text-muted mb-4">
                Logged in as: <strong>{adminInfo.email}</strong>
              </p>

              <LinkContainer to="/admin/manage-users">
                <Button variant="primary" className="bg-black border-black">
                  Go to Dashboard
                </Button>
              </LinkContainer>
            </>
          ) : (
            <>
              <h2 className="mb-3">Admin Portal</h2>
              <p className="text-muted mb-4">
                Please sign in to access the admin dashboard.
              </p>

              <LinkContainer to="/admin/login">
                <Button variant="primary" className="bg-black border-black">
                  Login
                </Button>
              </LinkContainer>
            </>
          )}
        </Card>
      </Container>
    </section>
  );
};

export default AdminHero;
