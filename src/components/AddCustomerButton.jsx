import CustomerAddUpdateModal from "./CustomerAddUpdateModal";

const AddCustomerButton = ({ setAddMsg, fetchCustomers }) => {
  return (
    <>
      <button
        className="btn mb-4 w-50"
        style={{ fontWeight: "bold" }}
        name="addNewCustomer"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#updateCustomer-modal-new"
      >
        Add New Customer
      </button>
      <CustomerAddUpdateModal
        setAddMsg={setAddMsg}
        fetchCustomers={fetchCustomers}
      />
    </>
  );
};

export default AddCustomerButton;
