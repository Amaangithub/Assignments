import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const DeleteConfirmationModal = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteConfirm,
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton className="no-border">
        Are you sure you want to delete ?
      </Modal.Header>
      <Modal.Footer className="no-border">
        <Button variant="outline-secondary" style={{ width: "100px" }} onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" style={{ width: "100px" }} onClick={handleDeleteConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;

DeleteConfirmationModal.propTypes = {
  showDeleteModal: PropTypes.bool.isRequired,
  setShowDeleteModal: PropTypes.func.isRequired,
  handleDeleteConfirm: PropTypes.func.isRequired,
};
