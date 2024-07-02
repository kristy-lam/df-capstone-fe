import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EnqUpdateModal from "../src/components/EnqUpdateModal";
import { updateEnqService } from "../src/services/enqWithAuth.service.js";
import EnqViewForm from "../src/components/EnqViewForm";
import { act } from "react";

describe("EnqAddForm tests", () => {
  const testEnq = {
    _id: "testId",
    preferredName: "Alex",
    mobile: "07123456789",
    email: "alex@email.com",
    postcode: "A12 3BC",
    testPreparation: true,
    skillsImprovement: false,
    enqMessage: "Hi, I would like to start lessons in July.",
    enqDate: "2024-06-20T20:42:56.922+00:00",
    replied: true,
    replyDate: "2024-06-21T20:42:56.922+00:00",
    replyMessage: "testing",
  };

  beforeEach(() => {
    render(
      <EnqUpdateModal
        enq={testEnq}
        index={0}
        fetchEnqs={vi.fn()}
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

  test("renders ErrorDiv when reply status is invalid", () => {
    // Assign
    const replyStatusInput = screen.queryByLabelText("Replied?");
    const errorMsg =
      "If reply status is true, there must be a reply date, and vice versa";
    // Act - Invalid reply status because there is a reply date
    fireEvent.click(replyStatusInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when reply status is valid", () => {
    // Assign
    const replyStatusInput = screen.queryByLabelText("Replied?");
    const replyDateInput = screen.queryByLabelText("Replied on");
    const errorMsg =
      "If reply status is true, there must be a reply date, and vice versa";
    // Act - Valid reply status when reply date is not provided
    fireEvent.click(replyStatusInput, { target: { value: "" } });
    fireEvent.change(replyDateInput, { target: { value: "" } });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when reply date is invalid", () => {
    // Assign
    const replyDateInput = screen.queryByLabelText("Replied on");
    const errorMsg =
      "1. If reply status is true, there must be a reply date, and vice versa; 2. Reply date cannot be earlier than the enquiry date";
    // Act
    // Invalid reply date because it is earlier than the enquiry date of 20/06/2024
    fireEvent.change(replyDateInput, { target: { value: "2024-06-19" } });
    // Assert
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });

  test("renders normally when reply date is valid", () => {
    // Assign
    const replyDateInput = screen.queryByLabelText("Replied on");
    const errorMsg =
      "1. If reply status is true, there must be a reply date, and vice versa; 2. Reply date cannot be earlier than the enquiry date";
    // Act
    // Valid reply status because it is later than the enquiry date of 20/06/2024
    fireEvent.change(replyDateInput, { target: { value: "2024-06-22" } });
    // Assert
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("renders ErrorDiv when name is removed", () => {
    // Assign
    const nameInput = screen.queryByLabelText("Name");
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
    vi.mock("../src/services/enqWithAuth.service.js", () => {
      return { updateEnqService: vi.fn() };
    });
    await updateEnqService.mockResolvedValueOnce("Enquiry updated");
    // Act
    act(() => {
      const replyMsgInput = screen.queryByLabelText("Reply message");
      fireEvent.change(replyMsgInput, { target: { value: "test update" } });
      const saveButton = screen.queryByText("Save");
      fireEvent.click(saveButton);
    });
    // Assert
    () => {
      render(<EnqViewForm enq={testEnq} index={0} />, {
        wrapper: BrowserRouter,
      });
      expect(screen.queryByTestId("success-div")).toBeInTheDocument();
      expect(screen.queryByText("Enquiry updated")).toBeInTheDocument();
    };
  });

  test("error message is available after unsuccessful update", async () => {
    // Assign
    vi.mock("../src/services/enqWithAuth.service.js", () => {
      return { updateEnqService: vi.fn() };
    });
    await updateEnqService.mockResolvedValueOnce("Test update error");
    // Act
    act(() => {
      const replyMsgInput = screen.queryByLabelText("Reply message");
      fireEvent.change(replyMsgInput, { target: { value: "test update" } });
      const saveButton = screen.queryByText("Save");
      fireEvent.click(saveButton);
    });
    // Assert
    () => {
      render(<EnqViewForm enq={testEnq} index={0} />, {
        wrapper: BrowserRouter,
      });
      expect(screen.queryByTestId("error-div")).toBeInTheDocument();
      expect(screen.queryByText("Something went wrong...")).toBeInTheDocument();
    };
  });
});
