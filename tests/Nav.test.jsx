import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Nav from "../src/components/Nav";

describe("NavBar tests", () => {
  test("renders 'Home', 'Lessons' and 'Instructor Login' when user is not logged in", () => {
    // Assign & Act
    render(
      <MemoryRouter>
        <Nav isLoggedIn={false} />
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Lessons")).toBeInTheDocument();
    expect(screen.getByText("Instructor Login")).toBeInTheDocument();
    expect(screen.queryByText("Manage Enquiries")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  test("renders 'Home', 'Lessons', 'Manage Enquiries' and 'Logout' when user is logged in", () => {
    // Assign & Act
    render(
      <MemoryRouter>
        <Nav isLoggedIn={true} />
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Lessons")).toBeInTheDocument();
    expect(screen.getByText("Manage Enquiries")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Instructor Login")).not.toBeInTheDocument();
  });

  test("renders 'Home', 'Lessons' and 'Instructor Login' when user is not logged in", () => {
    // Assign & Act
    render(
      <MemoryRouter>
        <Nav isLoggedIn={false} />
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Lessons")).toBeInTheDocument();
    expect(screen.getByText("Instructor Login")).toBeInTheDocument();
    expect(screen.queryByText("Manage Enquiries")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });
});
