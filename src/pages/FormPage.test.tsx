import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormPage from "@/pages/FormPage";

describe("FormPage", () => {
  it("renders the form header", () => {
    render(<FormPage />);
    expect(screen.getByText("CREATE USER")).toBeInTheDocument();
    expect(screen.getByText("Create a New User Profile")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<FormPage />);
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Address 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Address 2")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<FormPage />);
    expect(screen.getByRole("button", { name: "Create New User" })).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<FormPage />);
    
    await user.click(screen.getByRole("button", { name: "Create New User" }));
    
    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    expect(screen.getByText("Contact number is required")).toBeInTheDocument();
    expect(screen.getAllByText("Address is required").length).toBe(2);
  });

  it("shows success message after valid submission", async () => {
    const user = userEvent.setup();
    render(<FormPage />);
    
    await user.type(screen.getByLabelText("First Name"), "John");
    await user.type(screen.getByLabelText("Last Name"), "Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Contact Number"), "1234567890");
    await user.type(screen.getByLabelText("Address 1"), "123 Main St");
    await user.type(screen.getByLabelText("Address 2"), "Apt 1");
    
    await user.click(screen.getByRole("button", { name: "Create New User" }));
    
    expect(screen.getByText("User created successfully!")).toBeInTheDocument();
  });
});
