import {render, screen} from "@testing-library/react";

import {describe, it, expect} from "vitest";
import PasswordStrength from "..";
describe("PasswordStrength", () => {
  it("render PasswordStrength", () => {
    render(<PasswordStrength score={1} />);

    expect(screen.getByTitle("strength")).toBeInTheDocument();
  });
  it("render weak PasswordStrength", () => {
    render(<PasswordStrength score={1} />);

    expect(screen.getByText("Weak")).toBeInTheDocument();
  });
  it("render weak PasswordStrength", () => {
    render(<PasswordStrength score={3} />);

    expect(screen.getByText("Medium")).toBeInTheDocument();
  });
  it("render weak PasswordStrength", () => {
    render(<PasswordStrength score={5} />);

    expect(screen.getByText("Strong")).toBeInTheDocument();
  });
  // it("not render PasswordStrength", () => {
  //   render(<PasswordStrength score={0} />);

  //   expect(screen.getByTitle("strength")).toBeNull();
  // });
});
