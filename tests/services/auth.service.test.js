import axiosMock from "axios";
import Cookies from "js-cookie";
import authService from "../../src/services/auth.service.js";

describe("authService tests", () => {
  vi.mock("axios");
  vi.mock("js-cookie");

  let cookieStore = {};

  Cookies.set.mockImplementation((tokenName, token) => {
    cookieStore[tokenName] = token;
  });
  Cookies.get.mockImplementation((tokenName) => cookieStore[tokenName]);

  const testUser = { username: "admin", password: "Password123!" };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should store the token in cookies and return 'Login success'", async () => {
    // Assign
    const expectedReturn = "Login success";
    const expectedToken = "testToken";
    axiosMock.post.mockResolvedValueOnce({
      data: { message: expectedReturn },
      headers: { authorization: expectedToken },
    });
    // Act
    const result = await authService(testUser);
    // Assert
    expect(result).toEqual(expectedReturn);
    expect(Cookies.set).toHaveBeenCalledWith("token", expectedToken, {
      expires: 1,
      secure: true,
    });
    console.log(Cookies.get("token"));
    expect(Cookies.get("token")).toEqual(expectedToken);
  });

  it("should return an error object with provided error message", async () => {
    // Assign
    const expectedError = new Error("Test error");
    axiosMock.post.mockRejectedValueOnce(expectedError);
    // Act
    const result = await authService(testUser);
    // Assert
    expect(result).toEqual(expectedError);
  });
});
