import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ErrorDiv from "../src/components/ErrorDiv";

describe("ErrorDiv tests", () => {
  test("renders test message in component", async () => {
    // Assign
    const testMsg = "Test message";
    // Act
    render(<ErrorDiv errorMsg={testMsg} />);
    // Assert
    expect(screen.getByText(testMsg)).toBeInTheDocument();
  });
});
