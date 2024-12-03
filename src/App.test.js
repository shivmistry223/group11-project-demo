import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Student Form/i);
  expect(linkElement).toBeInTheDocument();
});
