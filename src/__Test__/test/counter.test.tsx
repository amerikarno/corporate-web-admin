import { render, screen } from "@testing-library/react";
import { Counter } from "./counter";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/dom";

test("Button is present after loading", () => {
  render(<Counter />);
  expect(screen.getByTestId("button")).toBeInTheDocument();
});

test("Button clicking increments value by 1", () => {
  render(<Counter />);
  const button = screen.getByTestId("button");
  fireEvent.click(button);
  expect(button).toHaveTextContent("count is 1");
});
