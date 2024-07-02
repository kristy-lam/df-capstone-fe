import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import EnqSec from "../src/components/EnqSec";
import { getEnqsService } from "../src/services/enqWithAuth.service.js";

describe("EnqSec tests", async () => {
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

  vi.mock("../src/services/enqWithAuth.service.js", () => ({
    getEnqsService: vi.fn(),
  }));

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Tests related to getEnqs service", () => {
    test("renders testEnq when enquiries are available", async () => {
      // Assign
      getEnqsService.mockResolvedValueOnce([testEnq]);
      // Act
      await act(async () => {
        render(
          <MemoryRouter>
            <HelmetProvider>
              <EnqSec isLoggedIn={true} />
            </HelmetProvider>
          </MemoryRouter>
        );
      });
      // Assert
      const enqViewForm = screen.getByTestId("enq-view-form");
      expect(enqViewForm).toBeInTheDocument();
      const enqTitles = screen.getAllByText("# 1 : from Alex on 20/06/2024");
      expect(enqTitles).toHaveLength(2); // Once in EnqViewForm and once in EnqUpdateModal
    });

    test("renders fail message when enquiries are not available", async () => {
      // Assign
      getEnqsService.mockResolvedValueOnce({
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
              <EnqSec isLoggedIn={true} />
            </HelmetProvider>
          </MemoryRouter>
        );
      });
      // Assert
      () => {
        expect(screen.queryByText(/Test error/i)).toBeInTheDocument();
      };
      const enqViewForm = screen.queryByTestId("enq-view-form");
      expect(enqViewForm).not.toBeInTheDocument();
    });
  });
});
