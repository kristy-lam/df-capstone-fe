import axios from "axios";
import Cookies from "js-cookie";

const getEnqsService = async () => {
  try {
    const token = Cookies.get("token");
    const res = await axios.get(import.meta.env.VITE_APP_GET_ENQS_URL, {
      headers: { Authorization: token },
    });
    return res.data;
    // res.status = status code
    // res.data = all enqs in an array
  } catch (e) {
    return e;
  }
};

const updateEnqService = async (updatedEnq) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.patch(
      `${import.meta.env.VITE_APP_ENQ_URL}/${updatedEnq._id}`,
      updatedEnq,
      {
        headers: { Authorization: token },
      }
    );
    return res;
    // res.status = status code
    // res.data = updated enq
  } catch (e) {
    return e;
  }
};

const deleteEnqService = async (enqId) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.delete(
      `${import.meta.env.VITE_APP_ENQ_URL}/${enqId}`,
      {
        headers: { Authorization: token },
      }
    );
    return res.data.message;
    // res.status = status code
    // res.data.message = Enquiry deleted
  } catch (e) {
    return e;
  }
};

export { getEnqsService, updateEnqService, deleteEnqService };
