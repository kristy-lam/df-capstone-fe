import axiosMock from "axios";
import Cookies from "js-cookie";
import {
  deleteEnqService,
  getEnqsService,
  updateEnqService,
} from "../../src/services/enqWithAuth.service.js";

describe("Tests on enquiry requests requiring authentication", () => {
  vi.mock("axios");
  vi.mock("js-cookie");

  const cookieStore = { token: "testToken" };
  Cookies.get.mockImplementation((tokenName) => cookieStore[tokenName]);

  const testEnq = {
    _id: "testID",
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

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getEnqsService tests", () => {
    it("should return all enquiries in an array", async () => {
      // Assign
      const expectedReturn = [testEnq];
      const token = Cookies.get("token");
      axiosMock.get.mockResolvedValueOnce(
        {
          data: expectedReturn,
        },
        { headers: { Authorization: token } }
      );
      // Act
      const result = await getEnqsService();
      // Assert
      expect(result).toEqual(expectedReturn);
    });

    it("should return an error object with provided error message", async () => {
      // Assign
      const expectedError = new Error("Test error");
      axiosMock.get.mockRejectedValueOnce(expectedError);
      // Act
      const result = await getEnqsService();
      // Assert
      expect(result).toEqual(expectedError);
    });
  });

  describe("updateEnqService tests", () => {
    it("should return a 202 status and updated enquiry when update is successful", async () => {
      // Assign
      const expectedStatus = 202;
      const expectedReturn = testEnq;
      const token = Cookies.get("token");
      axiosMock.patch.mockResolvedValueOnce(
        {
          status: 202,
          data: expectedReturn,
        },
        { headers: { Authorization: token } }
      );
      // Act
      const result = await updateEnqService(testEnq);
      // Assert
      expect(result.status).toEqual(expectedStatus);
      expect(result.data).toEqual(expectedReturn);
    });

    it("should return an error object with provided error message", async () => {
      // Assign
      const expectedError = new Error("Test error");
      axiosMock.patch.mockRejectedValueOnce(expectedError);
      // Act
      const result = await updateEnqService(testEnq);
      // Assert
      expect(result).toEqual(expectedError);
    });
  });

  describe("deleteEnqService tests", () => {
    it("should return 'Enquiry deleted' when the enquiry is successfully deleted", async () => {
      // Assign
      const expectedReturn = "Enquiry deleted";
      const token = Cookies.get("token");
      axiosMock.delete.mockResolvedValueOnce(
        {
          data: { message: expectedReturn },
        },
        { headers: { Authorization: token } }
      );
      // Act
      const result = await deleteEnqService(testEnq._id);
      // Assert
      expect(result).toEqual(expectedReturn);
    });

    it("should return an error object with provided error message", async () => {
      // Assign
      const expectedError = new Error("Test error");
      axiosMock.delete.mockRejectedValueOnce(expectedError);
      // Act
      const result = await deleteEnqService(testEnq._id);
      // Assert
      expect(result).toEqual(expectedError);
    });
  });
});
