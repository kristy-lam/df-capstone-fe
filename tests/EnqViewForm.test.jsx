import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EnqViewForm from "../src/components/EnqViewForm";

describe("EnqViewForm tests", () => {
  const testEnq1 = {
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

  const testEnq2 = {
    _id: "testId",
    preferredName: "Alex",
    mobile: "07123456789",
    email: "alex@email.com",
    postcode: "A12 3BC",
    testPreparation: true,
    skillsImprovement: false,
    enqMessage: "Hi, I would like to start lessons in July.",
    enqDate: "2024-06-20T20:42:56.922+00:00",
    replied: false,
    replyDate: null,
    replyMessage: "",
  };

  vi.mock("../src/services/enqWithAuth.service", () => {
    return {
      updateEnqService: vi.fn(),
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders normally when an enquiry is available", () => {
    // Act
    render(<EnqViewForm enq={testEnq1} index={0} />, {
      wrapper: BrowserRouter,
    });
    // Assert
    expect(screen.queryByTestId("enq-view-form")).toBeInTheDocument();
  });

  test("renders replied status header when the enquiry has already been replied", () => {
    // Assign
    const expectedText = "Reply Status: Replied on 21/06/2024 ✅";
    // Act
    render(<EnqViewForm enq={testEnq1} index={0} />, {
      wrapper: BrowserRouter,
    });
    // Assert
    expect(screen.queryByText(expectedText)).toBeInTheDocument();
  });

  test("renders not yet replied status header when the enquiry has not been replied", () => {
    // Assign
    const expectedText = "Reply Status: NOT YET! ✘";
    // Act
    render(<EnqViewForm enq={testEnq2} index={0} />, {
      wrapper: BrowserRouter,
    });
    // Assert
    expect(screen.queryByText(expectedText)).toBeInTheDocument();
  });
});
