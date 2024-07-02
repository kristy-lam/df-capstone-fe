import { useEffect, useState } from "react";
import ErrorDiv from "./ErrorDiv.jsx";
import { updateEnqService } from "../services/enqWithAuth.service";
import { shortenDate, formatDate } from "../utils/dateFormatter.js";
import {
  validateReplyDate,
  validateReplyStatus,
  validateMobile,
  validateEmail,
  validatePostcode,
  validateTestAndSkills,
} from "../utils/validator.js";

export const EnqUpdateModal = ({ enq, index, fetchEnqs, setUpdateMsg }) => {
  const shortenedReplyDate = shortenDate(enq.replyDate);

  const [updatedReplyStatus, setUpdatedReplyStatus] = useState(
    enq.replied || false
  );
  const [updatedReplyDate, setUpdatedReplyDate] = useState(
    shortenedReplyDate || ""
  );
  const [updatedReplyMsg, setUpdatedReplyMsg] = useState(
    enq.replyMessage || ""
  );
  const [updatedName, setUpdatedName] = useState(enq.preferredName || "");
  const [updatedMobile, setUpdatedMobile] = useState(enq.mobile || "");
  const [updatedPostcode, setUpdatedPostcode] = useState(enq.postcode || "");
  const [updatedEmail, setUpdatedEmail] = useState(enq.email || "");
  const [updatedTest, setUpdatedTest] = useState(enq.testPreparation || false);
  const [updatedSkills, setUpdatedSkills] = useState(
    enq.skillsImprovement || false
  );
  const [updatedEnqMsg, setUpdatedEnqMsg] = useState(enq.enqMessage || "");
  const [isUpdateFormTouched, setIsUpdateFormTouched] = useState(false);
  const [isUpdateFormValid, setIsUpdateFormValid] = useState(false);

  useEffect(() => {
    setIsUpdateFormValid(
      validateReplyStatus(updatedReplyDate, updatedReplyStatus) &&
        validateReplyDate(updatedReplyStatus, enq.enqDate, updatedReplyDate) &&
        updatedName &&
        validateMobile(updatedMobile) &&
        validatePostcode(updatedPostcode) &&
        validateEmail(updatedEmail) &&
        validateTestAndSkills(updatedTest, updatedSkills)
    );
  }, [
    updatedReplyStatus,
    updatedReplyDate,
    updatedName,
    updatedMobile,
    updatedPostcode,
    updatedEmail,
    updatedTest,
    updatedSkills,
  ]);

  const handleUpdate = async () => {
    const updatedEnq = {
      _id: enq._id,
      replied: updatedReplyStatus,
      replyDate: updatedReplyDate,
      replyMessage: updatedReplyMsg,
      preferredName: updatedName,
      mobile: updatedMobile,
      postcode: updatedPostcode,
      email: updatedEmail,
      testPreparation: updatedTest,
      skillsImprovement: updatedSkills,
      enqMessage: updatedEnqMsg,
    };
    const updateResult = await updateEnqService(updatedEnq);
    if (updateResult.status === 202) {
      setUpdateMsg("Enquiry updated");
      await fetchEnqs();
      setTimeout(() => {
        setUpdateMsg("");
      }, 1500);
    } else {
      setUpdateMsg("Something went wrong...");
    }
  };

  const resetForm = () => {
    setUpdatedReplyStatus(enq.replied || false);
    setUpdatedReplyDate(shortenedReplyDate || "");
    setUpdatedReplyMsg(enq.replyMessage || "");
    setUpdatedName(enq.preferredName || "");
    setUpdatedMobile(enq.mobile || "");
    setUpdatedPostcode(enq.postcode || "");
    setUpdatedEmail(enq.email || "");
    setUpdatedTest(enq.testPreparation || false);
    setUpdatedSkills(enq.skillsImprovement || false);
    setUpdatedEnqMsg(enq.enqMessage || "");
    setIsUpdateFormTouched(false);
  };

  return (
    <div
      className="modal fade"
      id={`update-modal-${index}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`update-modal-${index}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5"
              id={`update-modal-${index}-label`}
            >{`# ${index + 1} : from ${updatedName} on ${formatDate(
              enq.enqDate
            )}`}</h1>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column justify-content-center enq-form">
              <div className="row mb-2">
                <div className="col-12 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={updatedReplyStatus}
                      onChange={(e) => {
                        setUpdatedReplyStatus(e.target.checked);
                        setIsUpdateFormTouched(true);
                      }}
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Replied?
                    </label>
                    {isUpdateFormTouched &&
                      !validateReplyStatus(
                        updatedReplyDate,
                        updatedReplyStatus
                      ) && (
                        <ErrorDiv
                          errorMsg={
                            "If reply status is true, there must be a reply date, and vice versa"
                          }
                        />
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-md-0 mb-2">
                  <label htmlFor="reply-date" className="form-label">
                    Replied on
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    type="date"
                    className="form-control"
                    id="reply-date"
                    value={updatedReplyDate}
                    onChange={(e) => {
                      setUpdatedReplyDate(e.target.value);
                      setIsUpdateFormTouched(true);
                    }}
                  />
                  {isUpdateFormTouched &&
                    !validateReplyDate(
                      updatedReplyStatus,
                      enq.enqDate,
                      updatedReplyDate
                    ) && (
                      <ErrorDiv
                        errorMsg={
                          "1. If reply status is true, there must be a reply date, and vice versa; 2. Reply date cannot be earlier than the enquiry date"
                        }
                      />
                    )}
                </div>
              </div>
              <div className="mb-3 w-100">
                <label htmlFor="reply-message" className="form-label">
                  Reply message
                </label>
                <textarea
                  className="form-control"
                  id="reply-message"
                  rows="2"
                  value={updatedReplyMsg}
                  onChange={(e) => {
                    setUpdatedReplyMsg(e.target.value);
                    setIsUpdateFormTouched(true);
                  }}
                ></textarea>
              </div>
              <hr />
              <div className="row mb-2">
                <div className="col-12 col-md-6 mb-2">
                  <label htmlFor="name" className="form-label">
                    Name
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
              </div>
              <div className="row mb-2">
                <div className="col-12 col-md-6 mb-2">
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
              </div>
              <div className="mb-3 w-100">
                <label htmlFor="enq-message" className="form-label">
                  Enquiry Message
                </label>
                <textarea
                  className="form-control"
                  id="enq-message"
                  rows="2"
                  value={updatedEnqMsg}
                  onChange={(e) => {
                    setUpdatedEnqMsg(e.target.value);
                    setIsUpdateFormTouched(true);
                  }}
                ></textarea>
              </div>
              <div className="mb-2 d-flex justify-content-between">
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

export default EnqUpdateModal;
