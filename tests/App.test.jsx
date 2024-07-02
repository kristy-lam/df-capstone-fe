import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";
import LessonsSec from "../src/components/LessonsSec";
import LoginSec from "../src/components/LoginSec";
import EnqSec from "../src/components/EnqSec";

describe("App tests", () => {
  const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return {
      user: userEvent.setup(),
      ...render(ui, { wrapper: BrowserRouter }),
    };
  };

  test("should render Nav, HomeSec and Footer when App starts", async () => {
    // Act
    const { user } = renderWithRouter(<App />);
    // Assert
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("home-sec")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("should render LessonsSec at '/lessons'", () => {
    // Act
    const route = "/lessons";
    renderWithRouter(
      <HelmetProvider>
        <LessonsSec />
      </HelmetProvider>,
      { route }
    );
    // Assert
    expect(screen.getByTestId("lessons-sec")).toBeInTheDocument();
  });

  test("should render LoginSec at '/login'", () => {
    // Act
    const route = "/login";
    renderWithRouter(
      <HelmetProvider>
        <LoginSec />
      </HelmetProvider>,
      { route }
    );
    // Assert
    expect(screen.getByTestId("login-sec")).toBeInTheDocument();
  });

  test("should render EnqSec at '/enq'", () => {
    // Act
    const route = "/enq";
    renderWithRouter(
      <HelmetProvider>
        <EnqSec />
      </HelmetProvider>,
      { route }
    );
    // Assert
    expect(screen.getByTestId("enq-sec")).toBeInTheDocument();
  });
});
