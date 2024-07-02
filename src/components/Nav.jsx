import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "/assets/logo.png";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("token");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" data-testid="nav">
      <div className="container-fluid">
        <img
          className="logo"
          src={logo}
          alt="Driving with Kristy logo (by flaticon.com)"
          title="by flaticon.com"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " selected" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/lessons"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " selected" : "")
                }
              >
                Lessons
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  to="/enq"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " selected" : "")
                  }
                >
                  Manage Enquiries
                </NavLink>
              </li>
            )}
          </ul>
          {!isLoggedIn ? (
            <Link to="/login" className="btn d-flex fs-5">
              Instructor Login
            </Link>
          ) : (
            <button
              className="btn d-flex fs-5"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
