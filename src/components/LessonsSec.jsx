import { Helmet } from "react-helmet-async";

const LessonsSec = () => {
  return (
    <>
      <Helmet>
        <title>Lessons - Driving with Kristy</title>
        <meta
          name="Lessons"
          content="Check out the different lessons on offer"
        />
      </Helmet>
      <div className="main-sec text-center" data-testid="lessons-sec">
        <div className="row">
          {/* Card 1 */}
          <div className="col-sm-6">
            <div className="card mb-3 lessons-card">
              <div className="card-body">
                <h2 className="card-title mt-3 mb-3 orange-text">
                  Test Preparation Lessons
                </h2>
                <p className="card-text">
                  Discover expert driving lessons tailored for your success in
                  the UK driving test with Kristy. Car with dual control
                  installed and car insurance included. Here's what you can
                  expect:
                </p>
                <li>
                  Detailed guidance on driving in accordance with traffic laws
                </li>
                <li>Training in essential manoeuvres for test</li>
                <li>
                  Confidence-building for driving in diverse road conditions
                </li>
                <li>
                  Mock driving tests for precise assessment and preparation
                </li>
                <li>Flexible scheduling to fit your busy lifestyle</li>
                <h4 className="mt-3 mb-3">£40 / hour</h4>
                <a href="/#enq-form" className="btn mb-3">
                  Register your interest now!
                </a>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-sm-6 ">
            <div className="card mb-3 lessons-card">
              <div className="card-body">
                <h2 className="card-title mt-3 mb-3 orange-text">
                  Skills Improvement Lessons
                </h2>
                <p className="card-text">
                  Elevate your driving proficiency with our personalised skills
                  improvement lessons. Car with dual control installed and car
                  insurance included. Lesson content can include:
                </p>
                <li>Master advanced and defensive driving techniques</li>
                <li>
                  Enhance your confidence in complex traffic scenarios and
                  adverse weather conditions
                </li>
                <li>
                  Refine precision and improve speed in manoeuvres such as
                  parking and reversing
                </li>
                <li>Receive personalised feedback and targeted coaching</li>
                <li>Flexible scheduling to fit your busy lifestyle</li>
                <h4 className="mt-3 mb-3">£40 / hour</h4>
                <a href="/#enq-form" className="btn mb-3">
                  Register your interest now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonsSec;
