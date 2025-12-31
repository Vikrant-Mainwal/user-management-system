import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

import { useUpdateAdminMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";

const AdminProfileScreen = () => {
  const dispatch = useDispatch();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [updateProfile, { isLoading }] = useUpdateAdminMutation();

  useEffect(() => {
    if (adminInfo) {
      setFullName(adminInfo.name);
      setEmailAddress(adminInfo.email);
    }
  }, [adminInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const updatedData = await updateProfile({
        name: fullName,
        email: emailAddress,
        password: newPassword,
      }).unwrap();

      dispatch(setCredentials(updatedData));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.errors?.[0]?.message || "Update failed");
    }
  };

  return (
    <FormContainer>
      <h2 className="mb-4">Update Profile</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={fullName}
            placeholder="Enter your name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={emailAddress}
            placeholder="Enter your email"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmNewPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="bg-black border-black">
          Update Profile
        </Button>
      </Form>

      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default AdminProfileScreen;
