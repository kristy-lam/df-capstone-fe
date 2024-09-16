import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CustomerDeleteModal from "../src/components/CustomerDeleteModal";
import testCustomer from "./data/testCustomer";

describe("CustomerDeleteModal tests", () => {
  beforeEach(() => {
    render(
      <CustomerDeleteModal
        customer={testCustomer}
        index={0}
        fetchCustomers={vi.fn()}
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
    expect(
      screen.queryByTestId("test-deleteCustomer-modal-0")
    ).toBeInTheDocument();
  });
});
