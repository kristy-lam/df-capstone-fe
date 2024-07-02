import axios from "axios";

const addEnqService = async (newEnq) => {
  try {
    const res = await axios.post(import.meta.env.VITE_APP_ADD_ENQ_URL, newEnq);
    return res.data.message;
  } catch (e) {
    return e;
  }
};

// res.status = status code
// res.data.message = Enquiry is added

export default addEnqService;
