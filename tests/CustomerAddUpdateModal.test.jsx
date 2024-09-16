import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CustomerAddUpdateModal from "../src/components/CustomerAddUpdateModal.jsx";
import { updateCustomerService } from "../src/services/customers.service.js";
import CustomerViewForm from "../src/components/CustomerViewForm.jsx";
import { act } from "react";
import testCustomer from "./data/testCustomer.js";

describe("CustomerAddUpdateModal tests", () => {
  beforeEach(() => {
    render(
      <CustomerAddUpdateModal
        customer={testCustomer}
        index={0}
        fetchCustomers={vi.fn()}
        setUpdateMsg={vi.fn()}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
  });

  test("renders normally (i.e. without ErrorDiv) when edit form has not been touched", () => {
    // Assert
    expect(screen.queryByTestId("error-div")).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when name is removed", () => {
    // Assign
    const nameInput = screen.queryByLabelText("Preferred Name");
    const testName = "testName";
    const errorMsg = "Must provide a name";
    // Act
    fireEvent.change(nameInput, { target: { value: testName } });
    fireEvent.change(nameInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders ErrorDiv when mobile is empty", () => {
    // Assign
    const mobileInput = screen.queryByLabelText("Mobile");
    const errorMsg = "Must provide an 11-digit number starting with '07'";
    // Act
    fireEvent.change(mobileInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when mobile is valid", () => {
    // Assign
    const mobileInput = screen.queryByLabelText("Mobile");
    const validMobile = "07123456789";
    const errorMsg = "Must provide an 11-digit number starting with '07'";
    // Act
    fireEvent.change(mobileInput, { target: { value: validMobile } });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when mobile is invalid", () => {
    // Assign
    const mobileInput = screen.queryByLabelText("Mobile");
    const testMobile = "1234567890";
    const errorMsg = "Must provide an 11-digit number starting with '07'";
    // Act
    fireEvent.change(mobileInput, { target: { value: testMobile } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders ErrorDiv when postcode is empty", () => {
    // Assign
    const postcodeInput = screen.queryByLabelText("Postcode");
    const errorMsg = "Must provide a valid postcode";
    // Act
    fireEvent.change(postcodeInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when postcode is valid", () => {
    // Assign
    const postcodeInput = screen.queryByLabelText("Postcode");
    const validPostcode = "A12 3BC";
    const errorMsg = "Must provide a valid postcode";
    // Act
    fireEvent.change(postcodeInput, { target: { value: validPostcode } });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when postcode is invalid", () => {
    // Assign
    const postcodeInput = screen.queryByLabelText("Postcode");
    const invalidPostcode = "A12";
    const errorMsg = "Must provide a valid postcode";
    // Act
    fireEvent.change(postcodeInput, { target: { value: invalidPostcode } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders ErrorDiv when email address is empty", () => {
    // Assign
    const emailInput = screen.queryByLabelText("Email address");
    const errorMsg = "Must provide a valid email address";
    // Act
    fireEvent.change(emailInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when email address is valid", () => {
    // Assign
    const emailInput = screen.queryByLabelText("Email address");
    const validEmail = "test@email.com";
    const errorMsg = "Must provide a valid email address";
    // Act
    fireEvent.change(emailInput, { target: { value: validEmail } });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when email address is invalid", () => {
    // Assign
    const emailInput = screen.queryByLabelText("Email address");
    const invalidEmail = "test@email";
    const errorMsg = "Must provide a valid email address";
    // Act
    fireEvent.change(emailInput, { target: { value: invalidEmail } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when either one of the test preparation and skills improvement radio buttons is checked", () => {
    // Assign
    const testRadio = screen.queryByLabelText("Test preparation");
    const skillsRadio = screen.queryByLabelText("Skills improvement");
    const errorMsg =
      "Must choose either test preparation or skills improvement";
    // Act
    fireEvent.change(testRadio, { target: { value: "checked" } });
    fireEvent.change(skillsRadio, { target: { value: "" } });
    // Assert
    const errorMsgs = screen.queryAllByText(errorMsg);
    expect(errorMsgs).toHaveLength(0);
  });

  test("save button is disabled when update form is invalid", () => {
    // Assign
    const emailInput = screen.queryByLabelText("Email address");
    const invalidEmail = "test@email";
    // Act
    fireEvent.change(emailInput, { target: { value: invalidEmail } });
    // Assert
    const saveButton = screen.queryByText("Save");
    expect(saveButton).toBeDisabled();
  });

  test("success message is available after successful update", async () => {
    // Assign
    vi.mock("../src/services/customers.service.js", () => {
      return { updateCustomerService: vi.fn() };
    });
    await updateCustomerService.mockResolvedValueOnce("Enquiry updated");
    // Act
    act(() => {
      const input = screen.queryByLabelText("Test Centre");
      fireEvent.change(input, { target: { value: "test update" } });
      const saveButton = screen.queryByText("Save");
      fireEvent.click(saveButton);
    });
    // Assert
    () => {
      render(<CustomerViewForm customer={testCustomer} index={0} />, {
        wrapper: BrowserRouter,
      });
      expect(screen.queryByTestId("success-div")).toBeInTheDocument();
      expect(screen.queryByText("Customer updated")).toBeInTheDocument();
    };
  });

  test("error message is available after unsuccessful update", async () => {
    // Assign
    vi.mock("../src/services/customers.service.js", () => {
      return { updateCustomerService: vi.fn() };
    });
    await updateCustomerService.mockResolvedValueOnce("Test update error");
    // Act
    act(() => {
      const input = screen.queryByLabelText("Test Centre");
      fireEvent.change(input, { target: { value: "test update" } });
      const saveButton = screen.queryByText("Save");
      fireEvent.click(saveButton);
    });
    // Assert
    () => {
      render(<CustomerViewForm customer={testCustomer} index={0} />, {
        wrapper: BrowserRouter,
      });
      expect(screen.queryByTestId("error-div")).toBeInTheDocument();
      expect(screen.queryByText("Something went wrong...")).toBeInTheDocument();
    };
  });
});
