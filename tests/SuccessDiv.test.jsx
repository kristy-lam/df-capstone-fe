import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SuccessDiv from "../src/components/SuccessDiv";

describe("SuccessDiv tests", () => {
  test("renders test message in component", async () => {
    // Assign
    const testMsg = "Test message";
    // Act
    render(<SuccessDiv successMsg={testMsg} />);
    // Assert
    expect(screen.getByText(testMsg)).toBeInTheDocument();
  });
});
