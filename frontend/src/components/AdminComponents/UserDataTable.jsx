import { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
  useUpdateUserByAdminMutation,
} from "../../slices/adminApiSlice";

const UsersDataTable = ({ users }) => {
  const [searchText, setSearchText] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [blockUser, { isLoading: blocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: unblocking }] = useUnblockUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserByAdminMutation();

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleBlockUser = async () => {
    try {
      await blockUser({ userId: selectedUserId }).unwrap();
      toast.success("User blocked successfully");
      setShowBlockModal(false);
    } catch (err) {
      toast.error(err?.data?.errors?.[0]?.message || "Action failed");
    }
  };

  const handleUnblockUser = async () => {
    try {
      await unblockUser({ userId: selectedUserId }).unwrap();
      toast.success("User unblocked successfully");
      setShowUnblockModal(false);
    } catch (err) {
      toast.error(err?.data?.errors?.[0]?.message || "Action failed");
    }
  };

  const openEditModal = (user) => {
    setSelectedUserId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser({
        userId: selectedUserId,
        name: editName,
        email: editEmail,
      });
      toast.success("User updated successfully");
      setShowEditModal(false);
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.errors?.[0]?.message || "Update failed");
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => openEditModal(user)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                   variant={user.isActive ? "danger" : "success"}
                  className="me-2"
                  onClick={() => {
                    if(user.isActive){
                    setSelectedUserId(user._id);
                    setShowBlockModal(true);
                  }else{
                    setSelectedUserId(user._id);
                    setShowUnblockModal(true);
                  }
                }}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form className="mt-3">
        <Form.Group>
          <Form.Label>Search User</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Form.Group>
      </Form>

      {/* Block Confirmation */}
      <Modal show={showBlockModal} onHide={() => setShowBlockModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to block this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBlockModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleBlockUser} disabled={blocking}>
            {blocking ? "Blocking..." : "Block"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Unblock Modal */}
      <Modal show={showUnblockModal} onHide={() => setShowUnblockModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Unblock</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to unblock this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUnblockModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleUnblockUser}
            disabled={unblocking}
          >
            {unblocking ? "Unblocking..." : "Unblock"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateUser} disabled={updating}>
            {updating ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersDataTable;
