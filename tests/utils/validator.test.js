import {
  validatePassword,
  validateMobile,
  validateEmail,
  validatePostcode,
  validateTestAndSkills,
  validateReplyDate,
  validateReplyStatus,
} from "../../src/utils/validator.js";

describe("Validator tests", () => {
  describe("validatePassword tests", () => {
    it("should return true when the password has at least 8 characters long and contain at least one uppercase letter, one number, and one special character", () => {
      // Assign
      const testPassword = "Password123!";
      // Act
      const result = validatePassword(testPassword);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return false when the password is empty", () => {
      // Assign
      const testPassword = "";
      // Act
      const result = validatePassword(testPassword);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the password has fewer than 8 characters", () => {
      // Assign
      const testPassword = "Pw123!";
      // Act
      const result = validatePassword(testPassword);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the password has no uppercase letter", () => {
      // Assign
      const testPassword = "password123!";
      // Act
      const result = validatePassword(testPassword);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the password has no number", () => {
      // Assign
      const testPassword = "Password!";
      // Act
      const result = validatePassword(testPassword);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the password has no special character", () => {
      // Assign
      const testPassword = "Password123";
      // Act
      const result = validatePassword(testPassword);
      // Assert
      expect(result).to.equal(false);
    });
  });

  describe("validateMobile tests", () => {
    it("should return true when the mobile has 11 digits starting with '07'", () => {
      // Assign
      const testMobile = "07123456789";
      // Act
      const result = validateMobile(testMobile);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return false when the mobile has more than 11 digits", () => {
      // Assign
      const testMobile = "071234567890";
      // Act
      const result = validateMobile(testMobile);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the mobile is empty", () => {
      // Assign
      const testMobile = "";
      // Act
      const result = validateMobile(testMobile);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the mobile has fewer than 11 digits", () => {
      // Assign
      const testMobile = "0712345678";
      // Act
      const result = validateMobile(testMobile);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the mobile does not start with '07'", () => {
      // Assign
      const testMobile = "012345678901";
      // Act
      const result = validateMobile(testMobile);
      // Assert
      expect(result).to.equal(false);
    });
  });

  describe("validateEmail tests", () => {
    it("should return true when the email address is valid", () => {
      // Assign
      const testEmail = "test@email.com";
      // Act
      const result = validateEmail(testEmail);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return false when the email address is empty", () => {
      // Assign
      const testEmail = "";
      // Act
      const result = validateEmail(testEmail);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the email address is invalid", () => {
      // Assign
      const testEmail = "test@email";
      // Act
      const result = validateEmail(testEmail);
      // Assert
      expect(result).to.equal(false);
    });
  });

  describe("validatePostcode tests", () => {
    it("should return true when the postcode is valid (5 alphanumeric characters with a space between outward and inward codes)", () => {
      // Assign
      const testPostcode = "A1 2BC";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return true when the postcode is valid (5 alphanumeric characters without a space between outward and inward codes)", () => {
      // Assign
      const testPostcode = "A12BC";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return true when the postcode is valid (6 alphanumeric characters with a space between outward and inward codes)", () => {
      // Assign
      const testPostcode = "A12 3BC";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return true when the postcode is valid (6 alphanumeric characters without a space between outward and inward codes)", () => {
      // Assign
      const testPostcode = "A123BC";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return true when the postcode is valid (7 alphanumeric characters with a space between outward and inward codes)", () => {
      // Assign
      const testPostcode = "AB1C 4DE";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return true when the postcode is valid (7 alphanumeric characters without a space between outward and inward codes)", () => {
      // Assign
      const testPostcode = "AB1C4DE";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return false when the postcode has no alphabets in outward code", () => {
      // Assign
      const testPostcode = "123 ABC";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the postcode has no alphabets in inward code", () => {
      // Assign
      const testPostcode = "A12 345";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the postcode has no numeric digit in outward code", () => {
      // Assign
      const testPostcode = "ABC 1DE";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the postcode has no numeric digit in inward code", () => {
      // Assign
      const testPostcode = "A12 BCD";
      // Act
      const result = validatePostcode(testPostcode);
      // Assert
      expect(result).to.equal(false);
    });
  });

  describe("validateTestAndSkills tests", () => {
    it("should return true when testPreparation and skillsImprovement are not the same", () => {
      // Assign
      const testInput = true;
      const skillsInput = false;
      // Act
      const result = validateTestAndSkills(testInput, skillsInput);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return true when testPreparation and skillsImprovement are both true", () => {
      // Assign
      const testInput = true;
      const skillsInput = true;
      // Act
      const result = validateTestAndSkills(testInput, skillsInput);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return true when testPreparation and skillsImprovement are both undefined", () => {
      // Assign
      const testInput = undefined;
      const skillsInput = undefined;
      // Act
      const result = validateTestAndSkills(testInput, skillsInput);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return true when testPreparation and skillsImprovement are both false", () => {
      // Assign
      const testInput = false;
      const skillsInput = false;
      // Act
      const result = validateTestAndSkills(testInput, skillsInput);
      // Assert
      expect(result).to.equal(false);
    });
  });

  describe("validateReplyDate tests", () => {
    describe("Tests when a reply date is required", () => {
      const testReplyStatus = true;

      it("should return true when reply date is later than enquiry date", () => {
        // Assign
        const testEnqDate = "2024-06-26T00:00:00.000+00:00";
        const testReplyDate = "2024-06-27T00:00:00.000+00:00";
        // Act
        const result = validateReplyDate(
          testReplyStatus,
          testEnqDate,
          testReplyDate
        );
        // Assert
        expect(result).to.equal(true);
      });

      it("should return true when reply date is the same as enquiry date", () => {
        // Assign
        const testEnqDate = "2024-06-26T00:00:00.000+00:00";
        const testReplyDate = "2024-06-26T00:00:00.000+00:00";
        // Act
        const result = validateReplyDate(
          testReplyStatus,
          testEnqDate,
          testReplyDate
        );
        // Assert
        expect(result).to.equal(true);
      });

      it("should return true when reply date is later than enquiry date only in time", () => {
        // Assign
        const testEnqDate = "2024-06-25T00:20:00.000+00:00";
        const testReplyDate = "2024-06-25T00:00:00.000+00:00";
        // Act
        const result = validateReplyDate(
          testReplyStatus,
          testEnqDate,
          testReplyDate
        );
        // Assert
        expect(result).to.equal(true);
      });

      it("should return false when reply date is earlier than enquiry date", () => {
        // Assign
        const testEnqDate = "2024-06-26T00:00:00.000+00:00";
        const testReplyDate = "2024-06-25T00:00:00.000+00:00";
        // Act
        const result = validateReplyDate(
          testReplyStatus,
          testEnqDate,
          testReplyDate
        );
        // Assert
        expect(result).to.equal(false);
      });

      it("should return false when reply date is earlier than enquiry date", () => {
        // Assign
        const testEnqDate = "2024-06-26T00:00:00.000+00:00";
        const testReplyDate = "2024-06-25T00:00:00.000+00:00";
        // Act
        const result = validateReplyDate(
          testReplyStatus,
          testEnqDate,
          testReplyDate
        );
        // Assert
        expect(result).to.equal(false);
      });
    });

    describe("Tests when a reply date is not required", () => {
      const testReplyStatus = false;

      it("should return true when reply date is falsy", () => {
        // Assign
        const testEnqDate = "2024-06-26T00:00:00.000+00:00";
        const testReplyDate = null;
        // Act
        const result = validateReplyDate(
          testReplyStatus,
          testEnqDate,
          testReplyDate
        );
        // Assert
        expect(result).to.equal(true);
      });

      it("should return false when reply date is truthy", () => {
        // Assign
        const testEnqDate = "2024-06-26T00:00:00.000+00:00";
        const testReplyDate = "2024-06-27T00:00:00.000+00:00";
        // Act
        const result = validateReplyDate(
          testReplyStatus,
          testEnqDate,
          testReplyDate
        );
        // Assert
        expect(result).to.equal(false);
      });
    });
  });

  describe("validateReplyStatus tests", () => {
    it("should return true when both the reply date and reply status are truthy", () => {
      // Assign
      const testReplyDate = "2024-06-27T00:00:00.000+00:00";
      const testReplyStatus = true;
      // Act
      const result = validateReplyStatus(testReplyDate, testReplyStatus);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return true when both the reply date and reply status are falsy", () => {
      // Assign
      const testReplyDate = null;
      const testReplyStatus = false;
      // Act
      const result = validateReplyStatus(testReplyDate, testReplyStatus);
      // Assert
      expect(result).to.equal(true);
    });

    it("should return false when the reply date is truthy and reply status is falsy", () => {
      // Assign
      const testReplyDate = "2024-06-27T00:00:00.000+00:00";
      const testReplyStatus = false;
      // Act
      const result = validateReplyStatus(testReplyDate, testReplyStatus);
      // Assert
      expect(result).to.equal(false);
    });

    it("should return false when the reply date is falsy and reply status is truthy", () => {
      // Assign
      const testReplyDate = null;
      const testReplyStatus = true;
      // Act
      const result = validateReplyStatus(testReplyDate, testReplyStatus);
      // Assert
      expect(result).to.equal(false);
    });
  });
});
