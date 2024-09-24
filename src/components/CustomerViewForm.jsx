import { useEffect, useState } from "react";
import CustomerAddUpdateModal from "./CustomerAddUpdateModal";
import CustomerDeleteModal from "./CustomerDeleteModal";
import ErrorDiv from "./ErrorDiv.jsx";
import SuccessDiv from "./SuccessDiv.jsx";
import { formatDate } from "../utils/dateFormatter.js";
import MapDisplay from "./MapDisplay.jsx";

const CustomerViewForm = ({
  customer,
  index,
  fetchCustomers,
  setDeleteMsg,
}) => {
  const [viewCustomerId, setViewCustomerId] = useState(customer._id || "");
  const [viewCustomerFirstName, setViewCustomerFirstName] = useState(
    customer.firstName || ""
  );
  const [viewCustomerMiddleName, setViewCustomerMiddleName] = useState(
    customer.middleName || ""
  );
  const [viewCustomerPreferredName, setViewCustomerPreferredName] = useState(
    customer.preferredName || ""
  );
  const [viewCustomerLastName, setViewCustomerLastName] = useState(
    customer.lastName || ""
  );
  const [viewCustomerMobile, setViewCustomerMobile] = useState(
    customer.mobile || ""
  );
  const [viewCustomerEmail, setViewCustomerEmail] = useState(
    customer.email || ""
  );
  const [viewCustomerFirstLineOfAddress, setViewCustomerFirstLineOfAddress] =
    useState(customer.firstLineOfAddress || "");
  const [viewCustomerSecondLineOfAddress, setViewCustomerSecondLineOfAddress] =
    useState(customer.secondLineOfAddress || "");
  const [viewCustomerPostcode, setViewCustomerPostcode] = useState(
    customer.postcode || ""
  );
  const [viewCustomerDivingLicenceNum, setViewCustomerDrivingLicenceNum] =
    useState(customer.drivingLicenceNum || "");
  const [viewCustomerTest, setViewCustomerTest] = useState(
    customer.testPreparation || false
  );
  const [viewCustomerTestDate, setViewCustomerTestDate] = useState(
    customer.testDate || ""
  );
  const [viewCustomerTestCentre, setViewCustomerTestCentre] = useState(
    customer.testCentre || ""
  );
  const [viewCustomerSkills, setViewCustomerSkills] = useState(
    customer.skillsImprovement || false
  );
  const [viewCustomerDateAdded, setViewCustomerDateAdded] = useState(
    customer.dateAdded || ""
  );
  const [viewCustomerEnquiries, setViewCustomerEnquiries] = useState(
    customer.enquiries || []
  );
  const [updateMsg, setUpdateMsg] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setViewCustomerId(customer._id || "");
    setViewCustomerFirstName(customer.firstName || "");
    setViewCustomerMiddleName(customer.middleName || "");
    setViewCustomerPreferredName(customer.preferredName || "");
    setViewCustomerLastName(customer.lastName || "");
    setViewCustomerMobile(customer.mobile || "");
    setViewCustomerEmail(customer.email || "");
    setViewCustomerDrivingLicenceNum(customer.drivingLicenceNum || "");
    setViewCustomerFirstLineOfAddress(customer.firstLineOfAddress || "");
    setViewCustomerSecondLineOfAddress(customer.secondLineOfAddress || "");
    setViewCustomerPostcode(customer.postcode || "");
    setViewCustomerTest(customer.testPreparation);
    setViewCustomerTestDate(customer.testDate || "");
    setViewCustomerTestCentre(customer.testCentre || "");
    setViewCustomerSkills(customer.skillsImprovement);
    setViewCustomerDateAdded(customer.dateAdded || "");
    setViewCustomerEnquiries(customer.enquiries || []);
  }, [customer]);

  const toggleCollapsible = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center enq-form"
      data-testid="customer-view-form"
    >
      <h5 className="mb-3">{`${viewCustomerPreferredName} at ${viewCustomerPostcode}, joined on ${formatDate(
        viewCustomerDateAdded
      )}`}</h5>
      <h6 className="mb-3">{`(ID: ${viewCustomerId})`}</h6>
      <button
        type="button"
        name="expand-customer"
        className="collapsible"
        onClick={toggleCollapsible}
      >
        +
      </button>
      <div className="content" style={{ display: isActive ? "block" : "none" }}>
        <div className="row mb-2">
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="preferredName" className="form-label">
              Preferred Name
            </label>
            <input
              type="text"
              className="form-control"
              id="preferredName"
              readOnly
              value={viewCustomerPreferredName}
            />
          </div>
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              readOnly
              value={viewCustomerFirstName}
            />
          </div>
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="middleName" className="form-label">
              Middle Name
            </label>
            <input
              type="text"
              className="form-control"
              id="middleName"
              readOnly
              value={viewCustomerMiddleName}
            />
          </div>
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              readOnly
              value={viewCustomerLastName}
            />
          </div>
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              readOnly
              value={viewCustomerMobile}
            />
          </div>

          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              readOnly
              value={viewCustomerEmail}
            />
          </div>
          <div className="w-100 mb-2">
            <label htmlFor="drivingLicenceNum" className="form-label">
              Driving Licence Number
            </label>
            <input
              type="text"
              className="form-control"
              id="drivingLicenceNum"
              readOnly
              value={viewCustomerDivingLicenceNum}
            />
          </div>
          <div className="w-100 mb-2">
            <label htmlFor="firstLineOfAddress" className="form-label">
              First Line of Address
            </label>
            <input
              type="address"
              className="form-control"
              id="firstLineOfAddress"
              readOnly
              value={viewCustomerFirstLineOfAddress}
            />
          </div>
          <div className="w-100 mb-2">
            <label htmlFor="secondLineOfAddress" className="form-label">
              Second Line of Address
            </label>
            <input
              type="address"
              className="form-control"
              id="secondLineOfAddress"
              readOnly
              value={viewCustomerSecondLineOfAddress}
            />
          </div>
          <div className="row mb-2">
            <div className="w-100 mb-2">
              <label htmlFor="postcode" className="form-label">
                Postcode
              </label>
              <input
                type="postcode"
                className="form-control"
                id="postcode"
                readOnly
                value={viewCustomerPostcode}
              />
            </div>
            <MapDisplay viewPostcode={viewCustomerPostcode} />
          </div>
          <div className="row mb-2">
            <div className="col-12 col-md-6 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="test-preparation"
                  id="test-preparation"
                  readOnly
                  value={viewCustomerTest}
                  checked={viewCustomerTest}
                />
                <label className="form-check-label" htmlFor="test-preparation">
                  Test preparation
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="skills-improvement"
                  id="skills-improvement"
                  readOnly
                  value={viewCustomerSkills}
                  checked={viewCustomerSkills}
                />
                <label
                  className="form-check-label"
                  htmlFor="skills-improvement"
                >
                  Skills improvement
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="testCentre" className="form-label">
                Test Centre
              </label>
              <input
                type="text"
                className="form-control"
                id="testCentre"
                readOnly
                value={viewCustomerTestCentre}
              />
            </div>
            <div className="col-12 col-md-6 mb-2">
              <label htmlFor="testDate" className="form-label">
                Test Date
              </label>
              <input
                type="text"
                className="form-control"
                id="testDate"
                readOnly
                value={`${formatDate(viewCustomerTestDate)}`}
              />
            </div>
          </div>

          <div className="mb-2 d-flex justify-content-between">
            <button
              type="button"
              name="update-customer"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target={`#updateCustomer-modal-${index}`}
            >
              Update Customer
            </button>
            <CustomerAddUpdateModal
              customer={customer}
              index={index}
              fetchCustomers={fetchCustomers}
              setUpdateMsg={setUpdateMsg}
            />
            <button
              className="btn btn-danger"
              name="delete-customer"
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#deleteCustomer-modal-${index}`}
            >
              Delete
            </button>
            <CustomerDeleteModal
              customer={customer}
              index={index}
              fetchCustomers={fetchCustomers}
              setDeleteMsg={setDeleteMsg}
            />
          </div>
          {updateMsg && (
            <>
              {updateMsg === "Customer updated" ? (
                <SuccessDiv successMsg={updateMsg} />
              ) : (
                <ErrorDiv errorMsg={updateMsg} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerViewForm;
