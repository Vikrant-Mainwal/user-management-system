import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { PROFILE_IMAGE_DIR_PATH } from "../../utils/constants";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 text-center shadow-lg w-75">
          {userInfo ? (
            <>
              {userInfo.profileImageName && (
                <img
                  src={`${PROFILE_IMAGE_DIR_PATH}${userInfo.profileImageName}`}
                  alt={userInfo.name}
                  className="rounded-circle mb-3"
                  style={{ width: "140px", height: "140px", objectFit: "cover" }}
                />
              )}

              <h3 className="mb-3">Welcome, {userInfo.name}</h3>
              <p className="text-muted mb-4">{userInfo.email}</p>

              <LinkContainer to="/profile">
                <Button variant="dark">Go to Profile</Button>
              </LinkContainer>
            </>
          ) : (
            <>
              <h3 className="mb-3">Welcome to the User Dashboard</h3>
              <p className="text-muted mb-4">
                Please log in to access your dashboard.
              </p>

              <LinkContainer to="/login">
                <Button variant="dark" className="bg-black border-black">Login</Button>
              </LinkContainer>
            </>
          )}
        </Card>
      </Container>
    </section>
  );
};

export default Hero;
