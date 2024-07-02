import { Helmet } from "react-helmet-async";
import EnqAddForm from "./EnqAddForm";
import img from "/assets/home-img.png";

const HomeSec = () => {
  return (
    <>
      <Helmet>
        <title>Home - Welcome to Driving with Kristy!</title>
        <meta name="Home" content="Welcome to Driving with Kristy!" />
      </Helmet>
      <div className="main-sec" data-testid="home-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 d-flex flex-column flex-md-row flex-lg-column">
              <div className="w-100 col-12 col-md-6 col-lg-12 p-2">
                <img className="img-fluid" src={img} alt="It's a pass!" />
              </div>
              <div className="w-100 col-12 col-md-6 col-lg-12 p-2 text-justify">
                <h5>Welcome to Driving with Kristy! &#x1F697;</h5>
                <p>
                  Kristy offers AUTOMATIC driving lessons for test preparation
                  and skills improvement. With a patient and friendly approach,
                  Kristy tailors her lessons to meet your individual needs and
                  she ensures that every student feels comfortable and confident
                  behind the wheel. Kristy's lessons include a comprehensive
                  understanding of road safety and traffic laws, making sure you
                  are fully prepared for your driving test and driving safely on
                  the road. Join her today and take the first step towards
                  becoming a safe and skilled driver.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-6 p-2">
              <EnqAddForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSec;
