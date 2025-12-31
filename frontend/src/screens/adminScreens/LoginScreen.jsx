import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

import { useAdminLoginMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginAdmin, { isLoading }] = useAdminLoginMutation();
  const { adminInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [adminInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin({ email, password }).unwrap();
      dispatch(setCredentials(response));
      navigate("/admin");
    } catch (error) {
      toast.error(error?.data?.errors?.[0]?.message || "Login failed");
    }
  };

  return (
    <FormContainer>
      <h2 className="mb-4 text-center">Admin Login</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="bg-black border-black w-100">
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="mt-3">
        <Col className="text-center">
          Have an admin access code?{" "}
          <Link to="/admin/register">Register here</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default AdminLogin;
