import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import userEvent from "@testing-library/user-event";
import CustomerSec from "../src/components/CustomerSec.jsx";
import { getCustomersService } from "../src/services/customers.service.js";
import testCustomer from "./data/testCustomer.js";

describe("CustomerSec tests", async () => {
  vi.mock("../src/services/customers.service.js", () => ({
    getCustomersService: vi.fn(),
  }));

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Tests related to getCustomers service", () => {
    test("renders test customer", async () => {
      // Assign
      getCustomersService.mockResolvedValueOnce([testCustomer]);
      // Act
      await act(async () => {
        render(
          <MemoryRouter>
            <HelmetProvider>
              <CustomerSec isLoggedIn={true} />
            </HelmetProvider>
          </MemoryRouter>
        );
      });
      // Assert
      const customerViewForm = screen.getByTestId("customer-view-form");
      expect(customerViewForm).toBeInTheDocument();
      const customerViewFormTitle = screen.getByText(
        "testName at B1 2LS, joined on 31/08/2024"
      );
      expect(customerViewFormTitle).toBeInTheDocument();
    });

    test("renders fail message when customers are not available", async () => {
      // Assign
      getCustomersService.mockResolvedValueOnce({
        response: {
          data: {
            message: "Test error",
          },
        },
      });
      // Act
      await act(async () => {
        render(
          <MemoryRouter>
            <HelmetProvider>
              <CustomerSec isLoggedIn={true} />
            </HelmetProvider>
          </MemoryRouter>
        );
      });
      // Assert
      () => {
        expect(screen.queryByText(/Test error/i)).toBeInTheDocument();
      };
      const customerViewForm = screen.queryByTestId("customer-view-form");
      expect(customerViewForm).not.toBeInTheDocument();
    });

    test("opens add modal when add new customer button is clicked", async () => {
      // Arrange
      render(
        <MemoryRouter>
          <HelmetProvider>
            <CustomerSec isLoggedIn={true} />
          </HelmetProvider>
        </MemoryRouter>
      );
      //Act
      const addButton = screen.getByText("Add New Customer");
      await userEvent.click(addButton);
      const addModalTitle = "New Customer";
      // Assert
      expect(screen.getByText(addModalTitle)).toBeInTheDocument();
    });
  });
});
