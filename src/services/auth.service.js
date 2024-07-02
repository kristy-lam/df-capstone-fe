import axios from "axios";
import Cookies from "js-cookie";

const authService = async (user) => {
  try {
    const res = await axios.post(import.meta.env.VITE_APP_LOGIN_URL, user);
    const token = res.headers["authorization"];
    Cookies.set("token", token, { expires: 1, secure: true });
    return res.data.message;
  } catch (e) {
    return e;
  }
};

// res.status = status code
// res.data.message = Login success

export default authService;
