import { useEffect, useState } from "react";
import ErrorDiv from "./ErrorDiv.jsx";
import SuccessDiv from "./SuccessDiv.jsx";
import addEnqService from "../services/addEnq.service";
import {
  validateEmail,
  validateMobile,
  validatePostcode,
  validateTestAndSkills,
} from "../utils/validator";

const EnqAddForm = () => {
  const [preferredName, setPreferredName] = useState("");
  const [mobile, setMobile] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [test, setTest] = useState(false);
  const [skills, setSkills] = useState(false);
  const [enqMsg, setEnqMsg] = useState("");
  const [addMsg, setAddMsg] = useState("");
  const [isAddFormTouched, setIsAddFormTouched] = useState(false);
  const [isAddFormValid, setIsAddFormValid] = useState(false);

  useEffect(() => {
    setIsAddFormValid(
      preferredName &&
        validateMobile(mobile) &&
        validatePostcode(postcode) &&
        validateEmail(email) &&
        validateTestAndSkills(test, skills)
    );
  }, [preferredName, mobile, postcode, email, test, skills]);

  const handlePreferredNameChange = (event) => {
    const nameInput = event.target.value;
    setPreferredName(nameInput);
    setIsAddFormTouched(true);
  };

  const handleMobileChange = (event) => {
    const mobileInput = event.target.value;
    setMobile(mobileInput);
    setIsAddFormTouched(true);
  };

  const handlePostcodeChange = (event) => {
    const postcodeInput = event.target.value;
    setPostcode(postcodeInput);
    setIsAddFormTouched(true);
  };

  const handleEmailChange = (event) => {
    const emailInput = event.target.value;
    setEmail(emailInput);
    setIsAddFormTouched(true);
  };

  const handleTestChange = (event) => {
    if (event.target.value) {
      setTest(true);
      setSkills(false);
      setIsAddFormTouched(true);
    }
  };

  const handleSkillsChange = (event) => {
    if (event.target.value) {
      setSkills(true);
      setTest(false);
      setIsAddFormTouched(true);
    }
  };

  const handleEnqMsgChange = (event) => {
    const msgInput = event.target.value;
    setEnqMsg(msgInput);
    setIsAddFormTouched(true);
  };

  const resetForm = () => {
    setPreferredName("");
    setMobile("");
    setPostcode("");
    setEmail("");
    setTest(false);
    setSkills(false);
    setEnqMsg("");
    setIsAddFormTouched(false);
  };

  const handleSubmit = async () => {
    const newEnq = {
      preferredName: preferredName,
      mobile: mobile,
      email: email,
      postcode: postcode,
      testPreparation: test,
      skillsImprovement: skills,
      enqMessage: enqMsg,
    };
    const successMsg = await addEnqService(newEnq);
    if (successMsg === "Enquiry is added") {
      resetForm();
      setAddMsg(successMsg);
      setTimeout(() => {
        setAddMsg("");
      }, 1500);
    } else {
      setAddMsg("Oops, something went... Please try again");
    }
  };

  return (
    <form className="d-flex flex-column justify-content-center h-100 enq-form">
      <div className="align-items-center w-100">
        <h3 className="text-center orange-text">Contact Kristy</h3>
        <p className="text-center">
          As Kristy is always on the move, leave her a message and she will get
          back to you ASAP &#128522;
        </p>
        <div className="row mb-2">
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={preferredName}
              onChange={handlePreferredNameChange}
            />
            {isAddFormTouched && !preferredName && (
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
              required
              value={mobile}
              onChange={handleMobileChange}
            />
            {isAddFormTouched && !validateMobile(mobile) && (
              <ErrorDiv
                errorMsg={"Must provide an 11-digit number starting with '07'"}
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
              required
              value={postcode}
              onChange={handlePostcodeChange}
            />
            {isAddFormTouched && !validatePostcode(postcode) && (
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
              required
              value={email}
              onChange={handleEmailChange}
            />
            {isAddFormTouched && !validateEmail(email) && (
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
                required
                value={test}
                checked={test}
                onChange={handleTestChange}
              />
              <label className="form-check-label" htmlFor="test-preparation">
                Test preparation
              </label>
              {isAddFormTouched && !validateTestAndSkills(test, skills) && (
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
                required
                value={skills}
                checked={skills}
                onChange={handleSkillsChange}
              />
              <label className="form-check-label" htmlFor="skills-improvement">
                Skills improvement
              </label>
              {isAddFormTouched && !validateTestAndSkills(test, skills) && (
                <ErrorDiv
                  errorMsg={
                    "Must choose either test preparation or skills improvement"
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div className="mb-2 w-100">
          <label htmlFor="enq-message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="enq-message"
            rows="2"
            value={enqMsg}
            onChange={handleEnqMsgChange}
          ></textarea>
        </div>
        <div className="mb-2 d-flex justify-content-center">
          <button
            type="button"
            className="btn"
            name="submit"
            disabled={!isAddFormValid}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {addMsg &&
          (addMsg === "Enquiry is added" ? (
            <SuccessDiv successMsg={addMsg} />
          ) : (
            <ErrorDiv errorMsg={addMsg} />
          ))}
      </div>
    </form>
  );
};

export default EnqAddForm;
