import { useEffect, useState } from "react";
import ErrorDiv from "./ErrorDiv.jsx";
import {
  updateCustomerService,
  addCustomerService,
} from "../services/customers.service.js";
import { shortenDate, formatDate } from "../utils/dateFormatter.js";
import {
  validateMobile,
  validateEmail,
  validatePostcode,
  validateTestAndSkills,
  validateDrivingLicenceNum,
} from "../utils/validator.js";

export const CustomerAddUpdateModal = ({
  customer,
  index,
  fetchCustomers,
  setUpdateMsg,
  setAddMsg,
}) => {
  useEffect(() => {
    if (customer) customer.testDate = shortenDate(customer.testDate);
  }, [customer]);

  const [updatedFirstName, setUpdatedFirstName] = useState(
    customer?.firstName ?? ""
  );
  const [updatedMiddleName, setUpdatedMiddleName] = useState(
    customer?.middleName ?? ""
  );
  const [updatedName, setUpdatedName] = useState(customer?.preferredName ?? "");
  const [updatedLastName, setUpdatedLastName] = useState(
    customer?.lastName ?? ""
  );
  const [updatedMobile, setUpdatedMobile] = useState(customer?.mobile ?? "");
  const [updatedFirstLineOfAddress, setUpdatedFirstLineOfAddress] = useState(
    customer?.firstLineOfAddress ?? ""
  );
  const [updatedSecondLineOfAddress, setUpdatedSecondLineOfAddress] = useState(
    customer?.secondLineOfAddress ?? ""
  );
  const [updatedPostcode, setUpdatedPostcode] = useState(
    customer?.postcode ?? ""
  );
  const [updatedEmail, setUpdatedEmail] = useState(customer?.email ?? "");
  const [updatedDrivingLicenceNum, setUpdatedDrivingLicenceNum] = useState(
    customer?.drivingLicenceNum ?? ""
  );
  const [updatedTest, setUpdatedTest] = useState(
    customer?.testPreparation ?? false
  );
  const [updatedSkills, setUpdatedSkills] = useState(
    customer?.skillsImprovement ?? false
  );
  const [updatedTestDate, setUpdatedTestDate] = useState(
    customer?.testDate ?? ""
  );
  const [updatedTestCentre, setUpdatedTestCentre] = useState(
    customer?.testCentre ?? ""
  );

  const [isUpdateFormTouched, setIsUpdateFormTouched] = useState(false);
  const [isUpdateFormValid, setIsUpdateFormValid] = useState(false);

  useEffect(() => {
    setIsUpdateFormValid(
      updatedFirstName &&
        updatedLastName &&
        updatedName &&
        updatedFirstLineOfAddress &&
        validateDrivingLicenceNum(updatedDrivingLicenceNum) &&
        validateMobile(updatedMobile) &&
        validatePostcode(updatedPostcode) &&
        validateEmail(updatedEmail) &&
        validateTestAndSkills(updatedTest, updatedSkills)
    );
  }, [
    updatedFirstName,
    updatedLastName,
    updatedMiddleName,
    updatedDrivingLicenceNum,
    updatedName,
    updatedMobile,
    updatedFirstLineOfAddress,
    updatedSecondLineOfAddress,
    updatedPostcode,
    updatedEmail,
    updatedTest,
    updatedSkills,
    updatedTestDate,
    updatedTestCentre,
  ]);

  const handleUpdate = async () => {
    const updatedCustomer = {
      _id: customer._id,
      firstName: updatedFirstName,
      middleName: updatedMiddleName,
      preferredName: updatedName,
      lastName: updatedLastName,
      mobile: updatedMobile,
      firstLineOfAddress: updatedFirstLineOfAddress,
      secondLineOfAddress: updatedSecondLineOfAddress,
      postcode: updatedPostcode,
      email: updatedEmail,
      drivingLicenceNum: updatedDrivingLicenceNum,
      testPreparation: updatedTest,
      skillsImprovement: updatedSkills,
      testDate: updatedTestDate,
      testCentre: updatedTestCentre,
      dateAdded: customer.dateAdded,
      enquiries: customer.enquiries,
    };
    const updateResult = await updateCustomerService(updatedCustomer);
    if (updateResult.status === 202) {
      setUpdateMsg("Customer updated");
      await fetchCustomers();
      setTimeout(() => {
        setUpdateMsg("");
      }, 1500);
    } else {
      setUpdateMsg("Something went wrong...");
    }
  };

  const handleAdd = async () => {
    const newCustomer = {
      firstName: updatedFirstName,
      middleName: updatedMiddleName,
      preferredName: updatedName,
      lastName: updatedLastName,
      mobile: updatedMobile,
      firstLineOfAddress: updatedFirstLineOfAddress,
      secondLineOfAddress: updatedSecondLineOfAddress,
      postcode: updatedPostcode,
      email: updatedEmail,
      drivingLicenceNum: updatedDrivingLicenceNum,
      testPreparation: updatedTest,
      skillsImprovement: updatedSkills,
      testDate: updatedTestDate,
      testCentre: updatedTestCentre,
      enquiries: [],
    };
    const addResult = await addCustomerService(newCustomer);
    if (addResult === "Customer is added") {
      setAddMsg(addResult);
      await fetchCustomers();
      setTimeout(() => {
        setAddMsg("");
      }, 1500);
    } else {
      setAddMsg("Something went wrong...");
    }
  };

  const resetForm = () => {
    setUpdatedFirstName(customer.firstName || "");
    setUpdatedMiddleName(customer.middleName || "");
    setUpdatedName(customer.preferredName || "");
    setUpdatedLastName(customer.lastName || "");
    setUpdatedMobile(customer.mobile || "");
    setUpdatedFirstLineOfAddress(customer.firstLineOfAddress || "");
    setUpdatedSecondLineOfAddress(customer.secondLineOfAddress || "");
    setUpdatedPostcode(customer.postcode || "");
    setUpdatedEmail(customer.email || "");
    setUpdatedDrivingLicenceNum(customer.drivingLicenceNum || "");
    setUpdatedTest(customer.testPreparation || false);
    setUpdatedSkills(customer.skillsImprovement || false);
    setUpdatedTestCentre(customer.testCentre || "");
    setUpdatedTestDate(customer.testDate || "");
    setIsUpdateFormTouched(false);
  };

  return (
    <div
      className="modal fade"
      id={`updateCustomer-modal-${customer ? index : "new"}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`updateCustomer-modal-${customer ? index : "new"}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5"
              id={`updateCustomer-modal-${index}-label`}
            >
              {customer
                ? `${updatedName} at ${updatedPostcode}, joined on ${formatDate(
                    customer.dateAdded
                  )} (ID: ${customer._id})`
                : "New Customer"}
            </h1>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column justify-content-center customer-form">
              <div className="row mb-2">
                <div className="col-12 col-md-6 mb-2">
                  <label htmlFor="name" className="form-label">
                    Preferred Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={updatedName}
                    onChange={(e) => {
                      setUpdatedName(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched && !updatedName && (
                    <ErrorDiv errorMsg={"Must provide a name"} />
                  )}
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={updatedFirstName}
                    onChange={(e) => {
                      setUpdatedFirstName(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched && !updatedFirstName && (
                    <ErrorDiv errorMsg={"Must provide a first name"} />
                  )}
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <label htmlFor="middleName" className="form-label">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="middleName"
                    value={updatedMiddleName}
                    onChange={(e) => {
                      setUpdatedMiddleName(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
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
                    value={updatedLastName}
                    onChange={(e) => {
                      setUpdatedLastName(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched && !updatedLastName && (
                    <ErrorDiv errorMsg={"Must provide a last name"} />
                  )}
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    value={updatedMobile}
                    onChange={(e) => {
                      setUpdatedMobile(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched && !validateMobile(updatedMobile) && (
                    <ErrorDiv
                      errorMsg={
                        "Must provide an 11-digit number starting with '07'"
                      }
                    />
                  )}
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={updatedEmail}
                    onChange={(e) => {
                      setUpdatedEmail(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched && !validateEmail(updatedEmail) && (
                    <ErrorDiv errorMsg={"Must provide a valid email address"} />
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <div className="w-100 mb-2">
                  <label htmlFor="drivingLicenceNum" className="form-label">
                    Driving Licence Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="drivingLicenceNum"
                    value={updatedDrivingLicenceNum}
                    onChange={(e) => {
                      setUpdatedDrivingLicenceNum(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched &&
                    !validateDrivingLicenceNum(updatedDrivingLicenceNum) && (
                      <ErrorDiv
                        errorMsg={
                          "Must provide a 16 character driving licence number"
                        }
                      />
                    )}
                </div>
                <div className="w-100 mb-2">
                  <label htmlFor="firstLineOfAddress" className="form-label">
                    First Line of Address
                  </label>
                  <input
                    type="address"
                    className="form-control"
                    id="firstLineOfAddress"
                    value={updatedFirstLineOfAddress}
                    onChange={(e) => {
                      setUpdatedFirstLineOfAddress(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched && !updatedFirstLineOfAddress && (
                    <ErrorDiv
                      errorMsg={"Must provide the first line of address"}
                    />
                  )}
                </div>
                <div className="w-100 mb-2">
                  <label htmlFor="secondLineOfAddress" className="form-label">
                    Second Line of Address
                  </label>
                  <input
                    type="address"
                    className="form-control"
                    id="secondLineOfAddress"
                    value={updatedSecondLineOfAddress}
                    onChange={(e) => {
                      setUpdatedSecondLineOfAddress(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                </div>
                <div className="w-100 mb-2">
                  <label htmlFor="postcode" className="form-label">
                    Postcode
                  </label>
                  <input
                    type="postcode"
                    className="form-control"
                    id="postcode"
                    value={updatedPostcode}
                    onChange={(e) => {
                      setUpdatedPostcode(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched &&
                    !validatePostcode(updatedPostcode) && (
                      <ErrorDiv errorMsg={"Must provide a valid postcode"} />
                    )}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-12 col-md-6 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="test-or-skills"
                      id="test-preparation"
                      value="test-preparation"
                      checked={updatedTest}
                      onChange={(e) => {
                        setUpdatedTest(e.target.checked);
                        setUpdatedSkills(false);
                        setIsUpdateFormTouched(true);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="test-preparation"
                    >
                      Test preparation
                    </label>
                    {isUpdateFormTouched &&
                      !validateTestAndSkills(updatedTest, updatedSkills) && (
                        <ErrorDiv
                          errorMsg={
                            "Must choose either test preparation or skills improvement"
                          }
                        />
                      )}
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="test-or-skills"
                      id="skills-improvement"
                      value="skills-improvement"
                      checked={updatedSkills}
                      onChange={(e) => {
                        setUpdatedSkills(e.target.checked);
                        setUpdatedTest(false);
                        setIsUpdateFormTouched(true);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="skills-improvement"
                    >
                      Skills improvement
                    </label>
                    {isUpdateFormTouched &&
                      !validateTestAndSkills(updatedTest, updatedSkills) && (
                        <ErrorDiv
                          errorMsg={
                            "Must choose either test preparation or skills improvement"
                          }
                        />
                      )}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-12 col-md-6 mb-2">
                    <label htmlFor="testCentre" className="form-label">
                      Test Centre
                    </label>
                    <input
                      type="address"
                      className="form-control"
                      id="testCentre"
                      value={updatedTestCentre}
                      onChange={(e) => {
                        setUpdatedTestCentre(e.target.value);
                        setIsUpdateFormTouched(true);
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <label htmlFor="testDate" className="form-label">
                      Test Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="testDate"
                      value={updatedTestDate}
                      onChange={(e) => {
                        setUpdatedTestDate(e.target.value);
                        setIsUpdateFormTouched(true);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                {customer ? (
                  <button
                    className="btn"
                    name="save"
                    type="button"
                    data-bs-dismiss="modal"
                    onClick={handleUpdate}
                    disabled={!isUpdateFormValid}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn"
                    name="add"
                    type="button"
                    data-bs-dismiss="modal"
                    onClick={handleAdd}
                    disabled={!isUpdateFormValid}
                  >
                    Add
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAddUpdateModal;
