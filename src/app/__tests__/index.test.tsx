import {screen} from "@testing-library/react";

import {renderWithProviders} from "../../store/utils";

import {describe, it, expect} from "vitest";
import App from "../App";

describe("App", () => {
  it("renders component", () => {
    renderWithProviders(<App />);

    expect(screen.getByText("Form Submissions")).toBeInTheDocument();
  });
  it("empty submissions", () => {
    renderWithProviders(<App />);

    expect(screen.getByText(/No submissions yet/i)).toBeInTheDocument();
  });
  it("renders component", () => {
    renderWithProviders(<App />, {
      preloadedState: {
        form: {countries: [], submissions: [{id: "1", name: "Alex", age: 1, email: "ssss@gmail.com", gender: "male", picture: null, country: "Belarus", formType: "controlled", timestamp: 1}]},
      },
    });

    expect(screen.getByText(/Submitted:/i)).toBeInTheDocument();
  });
});
