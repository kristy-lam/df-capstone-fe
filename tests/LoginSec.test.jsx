import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LoginSec from "../src/components/LoginSec";
import authService from "../src/services/auth.service";

describe("LoginSec tests", () => {
  beforeEach(() => {
    vi.mock("../src/services/auth.service");
    render(
      <HelmetProvider>
        <LoginSec />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders normally (i.e. without ErrorDiv) when username is empty before the login form has been touched", () => {
    // Assign
    const usernameInput = screen.queryByPlaceholderText(
      "Enter your username..."
    );
    // Act
    fireEvent.change(usernameInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByTestId("error-div")).not.toBeInTheDocument();
  });

  test("renders normally when password is empty before the login form has been touched", () => {
    // Assign
    const passwordInput = screen.queryByPlaceholderText(
      "Enter your password..."
    );
    // Act
    fireEvent.change(passwordInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByTestId("error-div")).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when username is empty after the login form has been touched", () => {
    // Assign
    const usernameInput = screen.queryByPlaceholderText(
      "Enter your username..."
    );
    const testUsername = "testUser";
    const errorMsg = "Must provide a username";
    // Act
    fireEvent.change(usernameInput, { target: { value: testUsername } });
    fireEvent.change(usernameInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when password is valid", () => {
    // Assign
    const passwordInput = screen.queryByPlaceholderText(
      "Enter your password..."
    );
    const validPassword = "Password1!";
    const errorMsg =
      "The password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character";
    // Act
    fireEvent.change(passwordInput, { target: { value: validPassword } });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when password is empty after the login form has been touched", () => {
    // Assign
    const passwordInput = screen.queryByPlaceholderText(
      "Enter your password..."
    );
    const testPassword = "testPassword";
    const errorMsg =
      "The password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character";
    // Act
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders ErrorDiv when password is invalid", () => {
    // Assign
    const passwordInput = screen.queryByPlaceholderText(
      "Enter your password..."
    );
    const testPassword = "testPassword";
    const errorMsg =
      "The password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character";
    // Act
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("login button is disabled when login form is invalid", () => {
    // Assign
    const passwordInput = screen.queryByPlaceholderText(
      "Enter your password..."
    );
    const invalidPassword = "testPassword";
    // Act
    fireEvent.change(passwordInput, { target: { value: invalidPassword } });
    // Assert
    const loginButton = screen.queryByText("Login");
    expect(loginButton).toBeDisabled();
  });

  test("renders SuccessDiv and logout button when user successfully logs in", async () => {
    // Assign
    const successMsg = "Login success";
    // Act
    await authService.mockResolvedValueOnce(successMsg);
    // Assert
    () => {
      expect(screen.queryByText(successMsg)).toBeInTheDocument();
      const loginButton = screen.queryByRole("button", { name: "login" });
      expect(loginButton).not.toBeInTheDocument();
      const logoutButton = screen.queryByRole("button", { name: "logout" });
      expect(logoutButton).toBeInTheDocument();
    };
  });

  test("renders ErrorDiv and login button when user fails to log in", async () => {
    // Assign
    const errorMsg = "Test login error";
    // Act
    await authService.mockResolvedValueOnce(errorMsg);
    // Assert
    () => {
      expect(screen.queryByText(errorMsg)).toBeInTheDocument();
      const loginButton = screen.queryByRole("button", { name: "login" });
      expect(loginButton).toBeInTheDocument();
      const logoutButton = screen.queryByRole("button", { name: "logout" });
      expect(logoutButton).not.toBeInTheDocument();
    };
  });
});
