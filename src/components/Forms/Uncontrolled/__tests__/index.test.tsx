import {screen, fireEvent, waitFor} from "@testing-library/react";

import {renderWithProviders} from "../../../../store/utils";
import Uncontrolled from "..";

import {describe, it, expect} from "vitest";

describe("UncontrolledForm", () => {
  it("renders all form fields", () => {
    renderWithProviders(<Uncontrolled onClose={() => {}} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/profile picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
  });

  it("shows validation errors on submit with empty fields", async () => {
    renderWithProviders(<Uncontrolled onClose={() => {}} />);

    fireEvent.click(screen.getByText(/submit/i));

    // await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/age is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/please confirm your password/i)).toBeInTheDocument();
    expect(screen.getByText(/gender is required/i)).toBeInTheDocument();
    expect(screen.getByText(/country is required/i)).toBeInTheDocument();
    // expect(screen.getByText(/picture is required/i)).toBeInTheDocument();
    expect(screen.getByText(/you must accept the terms and conditions/i)).toBeInTheDocument();
    // });
  });
});
