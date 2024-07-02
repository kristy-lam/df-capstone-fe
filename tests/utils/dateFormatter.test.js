import { shortenDate, formatDate } from "../../src/utils/dateFormatter.js";

describe("Date Formatter tests", () => {
  // Assign
  const testStr = "2024-06-22T20:42:56.922+00:00";

  describe("formatDate tests", () => {
    it("should format ISO date string into dd/mm/yyyy", () => {
      // Act
      const result = formatDate(testStr);
      // Assert
      expect(result).to.equal("22/06/2024");
    });
  });

  describe("shortenDate tests", () => {
    it("should format ISO date string into yyyy-mm-dd", () => {
      // Act
      const result = shortenDate(testStr);
      // Assert
      expect(result).to.equal("2024-06-22");
    });
  });
});
