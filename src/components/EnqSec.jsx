import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import EnqViewForm from "./EnqViewForm";
import { getEnqsService } from "../services/enqWithAuth.service.js";
import SuccessDiv from "./SuccessDiv.jsx";
import ErrorDiv from "./ErrorDiv.jsx";

const EnqSec = () => {
  const [allEnqs, setAllEnqs] = useState(null);
  const [getFailMsg, setGetFailMsg] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  const fetchEnqs = async () => {
    const result = await getEnqsService();
    if (result instanceof Error) {
      setGetFailMsg(result.message);
    } else {
      setAllEnqs(result);
    }
  };

  useEffect(() => {
    fetchEnqs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Enquiries - Driving with Kristy</title>
        <meta
          name="Manage Enquiries"
          content="Update progress on replies to enquiries"
        />
      </Helmet>
      <div className="main-sec" data-testid="enq-sec">
        {deleteMsg && (
          <>
            {deleteMsg === "Enquiry deleted" ? (
              <SuccessDiv successMsg={deleteMsg} />
            ) : (
              <ErrorDiv errorMsg={deleteMsg} />
            )}
            <br />
          </>
        )}
        {Array.isArray(allEnqs) ? (
          <div className="row">
            {allEnqs.map((enq, index) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                <EnqViewForm
                  enq={enq}
                  index={index}
                  fetchEnqs={fetchEnqs}
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

export default EnqSec;
