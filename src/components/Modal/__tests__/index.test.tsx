import {fireEvent, render, screen} from "@testing-library/react";

import {describe, it, expect} from "vitest";
import Modal from "..";
describe("Modal", () => {
  it("render modal", () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        ariaLabel="modal">
        Modal Window
      </Modal>
    );

    expect(screen.getByText("Modal Window")).toBeInTheDocument();
  });
  it("click outside", () => {
    let n = 1;

    render(
      <Modal
        isOpen={true}
        onClose={() => {
          n += 1;
        }}
        ariaLabel="modal">
        Modal Window
      </Modal>
    );

    fireEvent.mouseDown(document);

    expect(n).toBe(2);
  });
  it("click escape", () => {
    let n = 1;

    render(
      <Modal
        isOpen={true}
        onClose={() => {
          n += 1;
        }}
        ariaLabel="modal">
        Modal Window
      </Modal>
    );

    fireEvent.keyDown(document, {key: "Escape"});

    expect(n).toBe(2);
  });
});
