import axiosMock from "axios";
import Cookies from "js-cookie";
import {
  addCustomerService,
  getCustomersService,
  updateCustomerService,
  deleteCustomerService,
} from "../../src/services/customers.service.js";
import testCustomer from "./data/testCustomer.js";
import { describe } from "vitest";

describe("Customer Services Tests (Requiring Authentication)", () => {
  vi.mock("axios");
  vi.mock("js-cookie");

  const cookieStore = { token: "testToken" };
  Cookies.get.mockImplementation((tokenName) => cookieStore[tokenName]);

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getCustomersService tests", () => {
    it("should return all customers in an array", async () => {
      // Arrange
      const expectedReturn = [testCustomer];
      const token = Cookies.get("token");
      axiosMock.get.mockResolvedValueOnce(
        {
          data: expectedReturn,
        },
        { headers: { Authorization: token } }
      );
      // Act
      const result = await getCustomersService();
      // Assert
      expect(result).toEqual(expectedReturn);
    });

    it("should return an error object with provided error message", async () => {
      // Arrange
      const expectedError = new Error("Test error");
      axiosMock.get.mockRejectedValueOnce(expectedError);
      // Act
      const result = await getCustomersService();
      // Assert
      expect(result).toEqual(expectedError);
    });
  });

  describe("addCustomerService tests", () => {
    it("should return 'Customer is added' when a customer is successfully added", async () => {
      // Arrange
      const expectedReturn = "Customer is added";
      axiosMock.post.mockResolvedValueOnce({
        data: { message: expectedReturn },
      });
      // Act
      const result = await addCustomerService(testCustomer);
      // Assert
      expect(result).toEqual(expectedReturn);
    });

    it("should return an error object with provided error message", async () => {
      // Arrange
      const expectedError = new Error("Test error");
      axiosMock.post.mockRejectedValueOnce(expectedError);
      // Act
      const result = await addCustomerService(testCustomer);
      // Assert
      expect(result).toEqual(expectedError);
    });
  });

  describe("updateCustomerService tests", () => {
    it("should return a 202 status and updated customer when update is successful", async () => {
      // Arrange
      const expectedStatus = 202;
      const expectedReturn = testCustomer;
      const token = Cookies.get("token");
      axiosMock.patch.mockResolvedValueOnce(
        {
          status: 202,
          data: expectedReturn,
        },
        { headers: { Authorization: token } }
      );
      // Act
      const result = await updateCustomerService(testCustomer);
      // Assert
      expect(result.status).toEqual(expectedStatus);
      expect(result.data).toEqual(expectedReturn);
    });

    it("should return an error object with provided error message", async () => {
      // Arrange
      const expectedError = new Error("Test error");
      axiosMock.patch.mockRejectedValueOnce(expectedError);
      // Act
      const result = await updateCustomerService(testCustomer);
      // Assert
      expect(result).toEqual(expectedError);
    });
  });

  describe("deleteCustomerService tests", () => {
    it("should return 'Customer deleted' when the enquiry is successfully deleted", async () => {
      // Arrange
      const expectedReturn = "Enquiry deleted";
      const token = Cookies.get("token");
      axiosMock.delete.mockResolvedValueOnce(
        {
          data: { message: expectedReturn },
        },
        { headers: { Authorization: token } }
      );
      // Act
      const result = await deleteCustomerService(testCustomer._id);
      // Assert
      expect(result).toEqual(expectedReturn);
    });

    it("should return an error object with provided error message", async () => {
      // Arrange
      const expectedError = new Error("Test error");
      axiosMock.delete.mockRejectedValueOnce(expectedError);
      // Act
      const result = await deleteCustomerService(testCustomer._id);
      // Assert
      expect(result).toEqual(expectedError);
    });
  });
});
