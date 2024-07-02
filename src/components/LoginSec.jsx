import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ErrorDiv from "./ErrorDiv.jsx";
import SuccessDiv from "./SuccessDiv.jsx";
import authService from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../utils/validator.js";

const LoginSec = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [isLoginFormTouched, setIsLoginFormTouched] = useState(false);
  const [isLoginFormValid, setIsLoginFormValid] = useState(false);

  useEffect(() => {
    setIsLoginFormValid(username && validatePassword(password));
  }, [username, password]);

  const handleUsernameChange = (event) => {
    const usernameInput = event.target.value;
    setIsLoginFormTouched(true);
    setUsername(usernameInput);
  };

  const handlePasswordChange = (event) => {
    const passwordInput = event.target.value;
    setIsLoginFormTouched(true);
    setPassword(passwordInput);
  };

  const handleLogin = async () => {
    const successMsg = await authService({
      username: username,
      password: password,
    });
    if (successMsg === "Login success") {
      setIsLoggedIn(true);
      setLoginMsg(successMsg);
      setTimeout(() => {
        navigate("/enq");
      }, 1500);
    } else {
      setLoginMsg("Login fail, please try again");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
  };

  return (
    <>
      <Helmet>
        <title>Instructor Login - Driving with Kristy</title>
        <meta
          name="Instructor Login"
          content="Log in to manage enquiries received"
        />
      </Helmet>
      <div
        className="main-sec text-center d-flex justify-content-center align-items-center"
        data-testid="login-sec"
      >
        <div className="card p-2">
          <div className="card-header">Instructor Login</div>
          <div className="card-body">
            <h5 className="card-title mb-4 orange-text">
              Welcome back, Kristy!
            </h5>
            <form className="login-form">
              {!isLoggedIn ? (
                <>
                  <div className="row mb-3">
                    <label htmlFor="username" className="form-label col-4">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control col-8"
                      name="username"
                      id="username"
                      placeholder="Enter your username..."
                      autoComplete="username"
                      required
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    {isLoginFormTouched && !username && (
                      <ErrorDiv errorMsg={"Must provide a username"} />
                    )}
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="password" className="form-label col-4">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control col-8"
                      name="password"
                      id="password"
                      placeholder="Enter your password..."
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {isLoginFormTouched && !validatePassword(password) && (
                      <ErrorDiv
                        errorMsg={
                          "The password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character"
                        }
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn mt-2 mb-2"
                    name="login"
                    onClick={handleLogin}
                    disabled={!isLoginFormValid}
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn mb-2"
                  name="logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
              {loginMsg &&
                (loginMsg === "Login success" ? (
                  <SuccessDiv successMsg={loginMsg} />
                ) : (
                  <ErrorDiv errorMsg={loginMsg} />
                ))}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSec;
