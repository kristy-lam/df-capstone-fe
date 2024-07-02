import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Cookies from "js-cookie";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomeSec from "./components/HomeSec";
import LessonsSec from "./components/LessonsSec";
import LoginSec from "./components/LoginSec";
import EnqSec from "./components/EnqSec";
import PageNotFound from "./components/PageNotFound";
import logo from "/assets/logo.png";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link rel="icon" type="image.png" href={logo} />
        </Helmet>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<HomeSec />} />
          <Route path="/lessons" element={<LessonsSec />} />
          <Route
            path="/login"
            element={
              <LoginSec isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/enq"
            element={
              <EnqSec isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </>
  );
};

export default App;
