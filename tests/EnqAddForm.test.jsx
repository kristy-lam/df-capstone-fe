import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EnqAddForm from "../src/components/EnqAddForm";
import addEnqService from "../src/services/addEnq.service.js";

describe("EnqAddForm tests", () => {
  beforeEach(() => {
    vi.mock("../src/services/addEnq.service.js");
    render(<EnqAddForm />, { wrapper: BrowserRouter });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders normally (i.e. without ErrorDiv) when add form has not been touched", () => {
    // Assert
    expect(screen.queryByTestId("error-div")).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when name is empty after the add form has been touched", () => {
    // Assign
    const nameInput = screen.getByLabelText("Name");
    const testName = "testName";
    const errorMsg = "Must provide a name";
    // Act
    act(() => {
      fireEvent.change(nameInput, { target: { value: testName } });
      fireEvent.change(nameInput, { target: { value: "" } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders ErrorDiv when mobile is empty after the add form has been touched", () => {
    // Assign
    const mobileInput = screen.getByLabelText("Mobile");
    const testMobile = "07123456789";
    const errorMsg = "Must provide an 11-digit number starting with '07'";
    // Act
    act(() => {
      fireEvent.change(mobileInput, { target: { value: testMobile } });
      fireEvent.change(mobileInput, { target: { value: "" } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when mobile is valid", () => {
    // Assign
    const mobileInput = screen.getByLabelText("Mobile");
    const validMobile = "07123456789";
    const errorMsg = "Must provide an 11-digit number starting with '07'";
    // Act
    act(() => {
      fireEvent.change(mobileInput, { target: { value: validMobile } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when mobile is invalid", () => {
    // Assign
    const mobileInput = screen.getByLabelText("Mobile");
    const testMobile = "1234567890";
    const errorMsg = "Must provide an 11-digit number starting with '07'";
    // Act
    act(() => {
      fireEvent.change(mobileInput, { target: { value: testMobile } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders ErrorDiv when postcode is empty after the add form has been touched", () => {
    // Assign
    const postcodeInput = screen.getByLabelText("Postcode");
    const testPostcode = "A12 3BC";
    const errorMsg = "Must provide a valid postcode";
    // Act
    act(() => {
      fireEvent.change(postcodeInput, { target: { value: testPostcode } });
      fireEvent.change(postcodeInput, { target: { value: "" } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when postcode is valid", () => {
    // Assign
    const postcodeInput = screen.getByLabelText("Postcode");
    const validPostcode = "A12 3BC";
    const errorMsg = "Must provide a valid postcode";
    // Act
    act(() => {
      fireEvent.change(postcodeInput, { target: { value: validPostcode } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when postcode is invalid", () => {
    // Assign
    const postcodeInput = screen.getByLabelText("Postcode");
    const invalidPostcode = "A12";
    const errorMsg = "Must provide a valid postcode";
    // Act
    act(() => {
      fireEvent.change(postcodeInput, { target: { value: invalidPostcode } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders ErrorDiv when email address is empty after the add form has been touched", () => {
    // Assign
    const emailInput = screen.getByLabelText("Email address");
    const testEmail = "test@email.com";
    const errorMsg = "Must provide a valid email address";
    // Act
    act(() => {
      fireEvent.change(emailInput, { target: { value: testEmail } });
      fireEvent.change(emailInput, { target: { value: "" } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when email address is valid", () => {
    // Assign
    const emailInput = screen.getByLabelText("Email address");
    const validEmail = "test@email.com";
    const errorMsg = "Must provide a valid email address";
    // Act
    act(() => {
      fireEvent.change(emailInput, { target: { value: validEmail } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when email address is invalid", () => {
    // Assign
    const emailInput = screen.getByLabelText("Email address");
    const invalidEmail = "test@email";
    const errorMsg = "Must provide a valid email address";
    // Act
    act(() => {
      fireEvent.change(emailInput, { target: { value: invalidEmail } });
    });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders ErrorDiv when both the test preparation and skills improvement radio button are unchecked after the add form has been touched", () => {
    // Assign
    const nameInput = screen.getByLabelText("Name");
    const testRadio = screen.getByLabelText("Test preparation");
    const skillsRadio = screen.getByLabelText("Skills improvement");
    const errorMsg =
      "Must choose either test preparation or skills improvement";
    // Act
    act(() => {
      fireEvent.change(nameInput, { target: { value: "testName" } });
      fireEvent.change(testRadio, { target: { value: "" } });
      fireEvent.change(skillsRadio, { target: { value: "" } });
    });
    // Assert
    const errorMsgs = screen.queryAllByText(errorMsg);
    expect(errorMsgs).toHaveLength(2); // Length of 2 because it applies to both radio buttons
  });

  test("renders normally when either one of the test preparation and skills improvement radio buttons is checked", () => {
    // Assign
    const testRadio = screen.getByLabelText("Test preparation");
    const skillsRadio = screen.getByLabelText("Skills improvement");
    const errorMsg =
      "Must choose either test preparation or skills improvement";
    // Act
    act(() => {
      fireEvent.change(testRadio, { target: { value: "checked" } });
      fireEvent.change(skillsRadio, { target: { value: "" } });
    });
    // Assert
    const errorMsgs = screen.queryAllByText(errorMsg);
    expect(errorMsgs).toHaveLength(0);
  });

  test("submit button is disabled when add form is invalid", () => {
    // Assign
    const emailInput = screen.getByLabelText("Email address");
    const invalidEmail = "test@email";
    // Act
    act(() => {
      fireEvent.change(emailInput, { target: { value: invalidEmail } });
    });
    // Assert
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test("renders SuccessDiv and the submit button disabled when the enquiry is successfully added", async () => {
    // Assign
    const successMsg = "Enquiry is added";
    await addEnqService.mockResolvedValueOnce(successMsg);
    // Act
    act(() => {
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "Test Name" },
      });
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "07123456789" },
      });
      fireEvent.change(screen.getByLabelText("Postcode"), {
        target: { value: "A12 3BC" },
      });
      fireEvent.change(screen.getByLabelText("Email address"), {
        target: { value: "test@email.com" },
      });
      fireEvent.click(screen.getByLabelText("Test preparation"));
      const submitButton = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(submitButton);
    });
    // Assert
    () => {
      expect(screen.queryByText(successMsg)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    };
  });

  test("renders error message and the submit button disabled when the enquiry cannot be added", async () => {
    // Assign
    const errorMsg = "Test add error";
    await addEnqService.mockResolvedValueOnce(errorMsg);
    // Act
    act(() => {
      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "Test Name" },
      });
      fireEvent.change(screen.getByLabelText("Mobile"), {
        target: { value: "07123456789" },
      });
      fireEvent.change(screen.getByLabelText("Postcode"), {
        target: { value: "A12 3BC" },
      });
      fireEvent.change(screen.getByLabelText("Email address"), {
        target: { value: "test@email.com" },
      });
      fireEvent.click(screen.getByLabelText("Test preparation"));
      const submitButton = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(submitButton);
    });
    // Assert
    () => {
      expect(screen.queryByText(errorMsg)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    };
  });
});
