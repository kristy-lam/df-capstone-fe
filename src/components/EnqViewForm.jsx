import { useEffect, useState } from "react";
import EnqUpdateModal from "./EnqUpdateModal";
import EnqDeleteModal from "./EnqDeleteModal";
import ErrorDiv from "./ErrorDiv.jsx";
import SuccessDiv from "./SuccessDiv.jsx";
import { formatDate } from "../utils/dateFormatter.js";

const EnqViewForm = ({ enq, index, fetchEnqs, setDeleteMsg }) => {
  const [viewEnqId, setViewEnqId] = useState(enq._id || "");
  const [viewName, setViewName] = useState(enq.preferredName || "");
  const [viewMobile, setViewMobile] = useState(enq.mobile || "");
  const [viewPostcode, setViewPostcode] = useState(enq.postcode || "");
  const [viewEmail, setViewEmail] = useState(enq.email || "");
  const [viewTest, setViewTest] = useState(enq.testPreparation || false);
  const [viewSkills, setViewSkills] = useState(enq.skillsImprovement || false);
  const [viewEnqMsg, setViewEnqMsg] = useState(enq.enqMessage || "");
  const [viewEnqDate, setViewEnqDate] = useState(enq.enqDate || "");
  const [viewReplyStatus, setViewReplyStatus] = useState(enq.replied || false);
  const [viewReplyDate, setViewReplyDate] = useState(enq.replyDate || "");
  const [viewReplyMsg, setViewReplyMsg] = useState(enq.replyMessage || "");
  const [updateMsg, setUpdateMsg] = useState("");

  useEffect(() => {
    setViewEnqId(enq._id || "");
    setViewName(enq.preferredName || "");
    setViewMobile(enq.mobile || "");
    setViewPostcode(enq.postcode || "");
    setViewEmail(enq.email || "");
    setViewTest(enq.testPreparation || false);
    setViewSkills(enq.skillsImprovement || false);
    setViewEnqMsg(enq.enqMessage || "");
    setViewEnqDate(enq.enqDate || "");
    setViewReplyStatus(enq.replied || false);
    const formattedDate = formatDate(enq.replyDate);
    setViewReplyDate(formattedDate || "");
    setViewReplyMsg(enq.replyMessage || "");
  }, [enq]);

  const expandCollapsible = (event) => {
    const button = event.target;
    button.classList.toggle("active");
    const content = button.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center enq-form"
      data-testid="enq-view-form"
    >
      <h5 className="mb-3">{`# ${index + 1} : from ${viewName} on ${formatDate(
        viewEnqDate
      )}`}</h5>
      <div className="row">
        <div className="col-12 mb-2">
          {viewReplyStatus ? (
            <div className="success-text reply-status-display">
              Reply Status: Replied on {viewReplyDate} &#9989;
            </div>
          ) : (
            <div className="error-text reply-status-display">
              Reply Status: NOT YET! &#10008;
            </div>
          )}
        </div>
      </div>
      <hr />
      <button
        type="button"
        name="expand-enq"
        className="collapsible"
        onClick={expandCollapsible}
      >
        +
      </button>
      <div className="content" style={{ display: "none" }}>
        <div className="mb-3 w-100">
          <label htmlFor="reply-message" className="form-label">
            Reply message
          </label>
          <textarea
            className="form-control"
            id="reply-message"
            rows="2"
            readOnly
            value={viewReplyMsg}
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
              readOnly
              value={viewName}
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
              value={viewMobile}
            />
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
              readOnly
              value={viewPostcode}
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
              value={viewEmail}
            />
          </div>
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
                value={viewTest}
                checked={viewTest}
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
                value={viewSkills}
                checked={viewSkills}
              />
              <label className="form-check-label" htmlFor="skills-improvement">
                Skills improvement
              </label>
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
            readOnly
            value={viewEnqMsg}
          ></textarea>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <button
            type="button"
            name="update-progress"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target={`#update-modal-${index}`}
          >
            Update Progress
          </button>
          <EnqUpdateModal
            enq={enq}
            index={index}
            fetchEnqs={fetchEnqs}
            setUpdateMsg={setUpdateMsg}
          />
          <button
            className="btn btn-danger"
            name="delete"
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#delete-modal-${index}`}
          >
            Delete
          </button>
          <EnqDeleteModal
            enq={enq}
            index={index}
            fetchEnqs={fetchEnqs}
            setDeleteMsg={setDeleteMsg}
          />
        </div>
        {updateMsg && (
          <>
            {updateMsg === "Enquiry updated" ? (
              <SuccessDiv successMsg={updateMsg} />
            ) : (
              <ErrorDiv errorMsg={updateMsg} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EnqViewForm;
