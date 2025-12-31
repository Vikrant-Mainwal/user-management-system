import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../components/FormContainer";
import { useUpdateUserMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { PROFILE_IMAGE_DIR_PATH } from "../../utils/constants";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setFullName(userInfo.name);
      setEmailAddress(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", emailAddress);
    formData.append("password", newPassword);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await updateProfile(formData).unwrap();
      dispatch(setCredentials(response));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.errors?.[0]?.message || "Update failed");
    }
  };

  return (
    <FormContainer>
      {userInfo?.profileImageName && (
        <img
          src={`${PROFILE_IMAGE_DIR_PATH}${userInfo.profileImageName}`}
          alt="Profile"
          className="rounded-circle d-block mx-auto mb-3"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      )}

      <h3 className="text-center mb-4">Update Profile</h3>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="bg-black border-black w-100">
          Save Changes
        </Button>
      </Form>

      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default ProfileScreen;
