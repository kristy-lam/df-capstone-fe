import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CustomerViewForm from "../src/components/CustomerViewForm";
import testCustomer from "../tests/data/testCustomer.js";

describe("CustomerViewForm tests", () => {
  test("renders normally when an enquiry is available", () => {
    // Act
    render(<CustomerViewForm customer={testCustomer} index={0} />, {
      wrapper: BrowserRouter,
    });
    // Assert
    expect(screen.queryByTestId("customer-view-form")).toBeInTheDocument();
  });

  test("opens update modal when update customer button is clicked", async () => {
    // Arrange
    render(<CustomerViewForm customer={testCustomer} index={0} />, {
      wrapper: BrowserRouter,
    });
    //Act
    const updateButton = screen.getByText("Update Customer");
    await userEvent.click(updateButton);
    const updateModalTitle = "testName at B1 2LS, joined on 31/08/2024";
    // Assert
    expect(screen.getByText(updateModalTitle)).toBeInTheDocument();
  });

  test("opens delete modal when delete button is clicked", async () => {
    // Arrange
    render(<CustomerViewForm customer={testCustomer} index={0} />, {
      wrapper: BrowserRouter,
    });
    //Act
    const deleteButton = screen.getByText("Delete");
    await userEvent.click(deleteButton);
    // Assert
    expect(screen.getByText("CONFIRM DELETE")).toBeInTheDocument();
  });
});
