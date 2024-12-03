import { render, screen, fireEvent, act } from "@testing-library/react";
import StudentForm from "./StudentForm";

test("renders the StudentForm component", () => {
  render(<StudentForm />);
  expect(screen.getByText("Insert Student")).toBeInTheDocument();
  expect(screen.getByText("Student List")).toBeInTheDocument();
});

test("adds a new student", () => {
  render(<StudentForm />);

  fireEvent.click(screen.getByText("Insert Student"));

  expect(screen.getByText("Add Student")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Student ID"), {
    target: { value: "123" },
  });
  fireEvent.change(screen.getByLabelText("Student Name"), {
    target: { value: "John Doe" },
  });

  fireEvent.click(screen.getByText("Add"));

  expect(screen.getByText("123")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();
});

test("deletes a student", () => {
  render(<StudentForm />);

  fireEvent.click(screen.getByText("Insert Student"));
  fireEvent.change(screen.getByLabelText("Student ID"), {
    target: { value: "123" },
  });
  fireEvent.change(screen.getByLabelText("Student Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.click(screen.getByText("Add"));

  fireEvent.click(screen.getByText("Delete"));

  expect(screen.queryByText("123")).toBeNull();
  expect(screen.queryByText("John Doe")).toBeNull();
});
