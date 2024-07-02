import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Welcome to Driving with Kristy!</title>
        <meta name="Page Not Found" content="Welcome to Driving with Kristy!" />
      </Helmet>
      <div className="main-sec" data-testid="404-sec">
        <h1>
          Oops... This page doesn't exist... We will take you back to Driving
          with Kristy now.
        </h1>
      </div>
    </>
  );
};

export default PageNotFound;
