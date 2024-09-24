import { deleteCustomerService } from "../services/customers.service.js";

const CustomerDeleteModal = ({
  customer,
  index,
  fetchCustomers,
  setDeleteMsg,
}) => {
  const handleDelete = async () => {
    const result = await deleteCustomerService(customer._id);
    if (result === "Customer deleted") {
      await fetchCustomers();
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
      id={`deleteCustomer-modal-${index}`}
      data-testid={`test-deleteCustomer-modal-${index}`}
      tabIndex="-1"
      aria-labelledby={`deleteCustomer-modal-${index}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <p>Are you sure about deleting this customer?</p>
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

export default CustomerDeleteModal;
