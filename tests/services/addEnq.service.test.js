import axiosMock from "axios";
import addEnqService from "../../src/services/addEnq.service.js";

describe("addEnqService tests", () => {
  vi.mock("axios");

  // Only info included in the contact form is included (i.e. no id, v, info about reply)
  const testEnq = {
    preferredName: "Alex",
    mobile: "07123456789",
    email: "alex@email.com",
    postcode: "A12 3BC",
    testPreparation: true,
    skillsImprovement: false,
    enqMessage: "Hi, I would like to start lessons in July.",
    enqDate: "2024-06-20T20:42:56.922+00:00",
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should return 'Enquiry is added' when enquiry is added", async () => {
    // Assign
    const expectedReturn = "Enquiry is added";
    axiosMock.post.mockResolvedValueOnce({
      data: { message: expectedReturn },
    });
    // Act
    const result = await addEnqService(testEnq);
    // Assert
    expect(result).toEqual(expectedReturn);
  });

  it("should return an error object with provided error message", async () => {
    // Assign
    const expectedError = new Error("Test error");
    axiosMock.post.mockRejectedValueOnce(expectedError);
    // Act
    const result = await addEnqService(testEnq);
    // Assert
    expect(result).toEqual(expectedError);
  });
});
