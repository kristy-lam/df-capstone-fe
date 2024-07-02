export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

export const validateMobile = (mobile) => {
  const regex = /^(07)\d{9}$/;
  return regex.test(mobile);
};

export const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const validatePostcode = (postcode) => {
  const regex = /^([A-Z]{1,2}[0-9][0-9A-Z]?[ ]?[0-9][A-Z]{2})$/;
  return regex.test(postcode);
};

export const validateTestAndSkills = (test, skills) => {
  return test != skills ? true : false;
};

export const validateReplyDate = (replyStatus, enqDate, replyDate) => {
  if (replyStatus) {
    // Removing time factor because reply date will always be at 00:00 hours
    // when new date is created through the front end calender
    const enqDateObj = new Date(enqDate).setHours(0, 0, 0, 0);
    const replyDateObj = new Date(replyDate).setHours(0, 0, 0, 0);
    return replyDateObj >= enqDateObj ? true : false;
  } else {
    return !replyDate ? true : false;
  }
};

export const validateReplyStatus = (replyDate, replyStatus) => {
  if (replyDate) {
    return replyStatus ? true : false;
  } else {
    return !replyStatus ? true : false;
  }
};
