import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home", () => {
  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByText("Posts Manager")).toBeInTheDocument();
  });

  it("renders a heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Posts Manager");
  });

  it("renders a bookmark button for each post", () => {
    // Mock the usePosts hook to return some posts
    jest.mock("@/custom-hooks/usePosts", () => ({
      __esModule: true,
      default: () => ({
        posts: [{ id: 1, title: "Test Post", body: "This is a test post." }],
        isLoading: false,
        isError: null,
        goToPage: jest.fn(),
        setSearchTerm: jest.fn(),
        searchTerm: "",
      }),
    }));

    render(<Home />);
    expect(screen.getByText(/Bookmark/i)).toBeInTheDocument();
  });

  it("renders a search input", () => {
    render(<Home />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
