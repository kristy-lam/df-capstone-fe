import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomersService } from "../services/customers.service.js";
import AddCustomerButton from "./AddCustomerButton.jsx";
import CustomerViewForm from "./CustomerViewForm.jsx";
import SuccessDiv from "./SuccessDiv.jsx";
import ErrorDiv from "./ErrorDiv.jsx";

const CustomerSec = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [allCustomers, setAllCustomers] = useState(null);
  const [getFailMsg, setGetFailMsg] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");
  const [addMsg, setAddMsg] = useState("");

  const fetchCustomers = async () => {
    const result = await getCustomersService();
    if (result instanceof Error) {
      setGetFailMsg(result.response.data.message);
    } else {
      setAllCustomers(result);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>Manage Customers - Driving with Kristy</title>
        <meta name="Manage Customers" content="Manage customers" />
      </Helmet>
      <div className="main-sec" data-testid="customer-sec">
        <div className="row justify-content-center">
          <AddCustomerButton
            setAddMsg={setAddMsg}
            fetchCustomers={fetchCustomers}
          />
        </div>
        {addMsg && (
          <>
            {addMsg === "Customer is added" ? (
              <SuccessDiv successMsg={addMsg} />
            ) : (
              <ErrorDiv errorMsg={addMsg} />
            )}
            <br />
          </>
        )}
        {deleteMsg && (
          <>
            {deleteMsg === "Customer deleted" ? (
              <SuccessDiv successMsg={deleteMsg} />
            ) : (
              <ErrorDiv errorMsg={deleteMsg} />
            )}
            <br />
          </>
        )}
        {Array.isArray(allCustomers) ? (
          <div className="row">
            {allCustomers.map((customer, index) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                <CustomerViewForm
                  customer={customer}
                  index={index}
                  fetchCustomers={fetchCustomers}
                  setDeleteMsg={setDeleteMsg}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="error-test align-items-center justify-content-center">
            <h1>{getFailMsg}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerSec;
