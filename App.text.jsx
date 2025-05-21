import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";

// Mock the LocationVisualizer component
jest.mock("./components/LocationVisualizer/index", () => ({
  LocationVisualizer: () => (
    <div data-testid='svg-implementation'>Implementation Content</div>
  ),
}));

// Mock the Description component
jest.mock("./Description", () => ({
  Description: () => <div data-testid='description'>Description Content</div>,
}));

describe("App Component", () => {
  test("renders description and implementation tabs", () => {
    render(<App />);
    const descriptionTab = screen.getByRole("tab", { name: /description/i });
    expect(descriptionTab).toBeInTheDocument();

    const implementationTab = screen.getByRole("tab", {
      name: /implementation/i,
    });
    expect(implementationTab).toBeInTheDocument();
  });

  test("should show description tab content by default", () => {
    render(<App />);
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.queryByTestId("svg-implementation")).not.toBeInTheDocument();
  });

  test("should switch to implementation tab when clicked", () => {
    render(<App />);

    // Initially, description tab is active
    expect(screen.getByTestId("description")).toBeInTheDocument();

    // Click implementation tab
    fireEvent.click(screen.getByRole("tab", { name: /implementation/i }));

    // Now implementation tab should be active
    expect(screen.queryByTestId("description")).not.toBeInTheDocument();
    expect(screen.getByTestId("svg-implementation")).toBeInTheDocument();
  });

  test("should switch back to description tab when clicked", () => {
    render(<App />);

    // Switch to implementation tab first
    fireEvent.click(screen.getByRole("tab", { name: /implementation/i }));
    expect(screen.getByTestId("svg-implementation")).toBeInTheDocument();

    // Now switch back to description tab
    fireEvent.click(screen.getByRole("tab", { name: /description/i }));

    // Description tab should be active again
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.queryByTestId("svg-implementation")).not.toBeInTheDocument();
  });
});
