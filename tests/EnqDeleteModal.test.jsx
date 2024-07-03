import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EnqDeleteModal from "../src/components/EnqDeleteModal";

describe("EnqDeleteModal tests", () => {
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
      <EnqDeleteModal
        enq={testEnq}
        index={0}
        fetchEnqs={vi.fn()}
        setDeleteMsg={vi.fn()}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders the modal with the correct index", () => {
    // Act & Assert
    expect(screen.queryByTestId("test-delete-modal-0")).toBeInTheDocument();
  });
});
