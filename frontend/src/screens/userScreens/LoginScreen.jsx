import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/FormContainer";
import { useLoginMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const LoginScreen = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [loginUser, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email: emailInput,
        password: passwordInput,
      }).unwrap();

      dispatch(setCredentials(response));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.errors?.[0]?.message || "Login failed");
    }
  };

  return (
    <FormContainer>
      <h2 className="mb-4">Sign In</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="bg-black border-black w-100">
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="mt-3">
        <Col className="text-center">
          New here? <Link to="/register">Create an account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
