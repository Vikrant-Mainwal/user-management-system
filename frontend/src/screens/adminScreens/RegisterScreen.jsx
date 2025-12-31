import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

import { useAdminRegisterMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";

const AdminRegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [registerAdmin, { isLoading }] = useAdminRegisterMutation();

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [adminInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await registerAdmin({
        name: fullName,
        email: emailAddress,
        password,
        adminRegistrationKey: registrationCode,
      }).unwrap();

      dispatch(setCredentials(result));
      navigate("/admin");
    } catch (error) {
      toast.error(error?.data?.errors?.[0]?.message || "Registration failed");
    }
  };

  return (
    <FormContainer>
      <h2 className="mb-4">Admin Registration</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="adminCode">
          <Form.Label>Admin Registration Code</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter admin access code"
            value={registrationCode}
            onChange={(e) => setRegistrationCode(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="bg-black border-black w-100">
          Register
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="mt-3">
        <Col className="text-center">
          Already registered? <Link to="/admin/login">Login here</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default AdminRegisterScreen;
