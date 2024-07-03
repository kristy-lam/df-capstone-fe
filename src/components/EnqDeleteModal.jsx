import { deleteEnqService } from "../services/enqWithAuth.service.js";

const EnqDeleteModal = ({ enq, index, fetchEnqs, setDeleteMsg }) => {
  const handleDelete = async () => {
    const result = await deleteEnqService(enq._id);
    if (result === "Enquiry deleted") {
      await fetchEnqs();
      setDeleteMsg(result);
      setTimeout(() => {
        setDeleteMsg("");
      }, 1500);
    } else {
      setDeleteMsg("Something went wrong...");
      setTimeout(() => {
        setDeleteMsg("");
      }, 1500);
    }
  };

  return (
    <div
      className="modal fade"
      id={`delete-modal-${index}`}
      data-testid={`test-delete-modal-${index}`}
      tabIndex="-1"
      aria-labelledby={`delete-modal-${index}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <p>Are you sure about deleting this enquiry?</p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
              name="confirm-delete"
              data-bs-dismiss="modal"
            >
              CONFIRM DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnqDeleteModal;
