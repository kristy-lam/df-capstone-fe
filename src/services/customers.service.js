import axios from "axios";
import Cookies from "js-cookie";

const getCustomersService = async () => {
  try {
    const token = Cookies.get("token");
    const res = await axios.get(import.meta.env.VITE_APP_GET_CUSTOMERS_URL, {
      headers: { Authorization: token },
    });
    return res.data;
    // res.status = status code
    // res.data = all customers in an array
  } catch (e) {
    return e;
  }
};

const addCustomerService = async (newCustomer) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(
      import.meta.env.VITE_APP_ADD_CUSTOMER_URL,
      newCustomer,
      {
        headers: { Authorization: token },
      }
    );
    return res.data.message;
    // res.status = status code
    // res.data.message = Customer is added
  } catch (e) {
    return e;
  }
};

const updateCustomerService = async (updatedCustomer) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.patch(
      `${import.meta.env.VITE_APP_CUSTOMER_URL}/${updatedCustomer._id}`,
      updatedCustomer,
      {
        headers: { Authorization: token },
      }
    );
    return res;
    // res.status = status code
    // res.data = updated customer
  } catch (e) {
    return e;
  }
};

const deleteCustomerService = async (customerId) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.delete(
      `${import.meta.env.VITE_APP_CUSTOMER_URL}/${customerId}`,
      {
        headers: { Authorization: token },
      }
    );
    return res.data.message;
    // res.status = status code
    // res.data.message = Customer deleted
  } catch (e) {
    return e;
  }
};

export {
  getCustomersService,
  addCustomerService,
  updateCustomerService,
  deleteCustomerService,
};
