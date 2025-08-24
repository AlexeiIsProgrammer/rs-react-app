import {describe, it, expect, vi, beforeEach} from "vitest";
import {toBase64} from "../toBase64";

describe("toBase64", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully convert a file to base64", async () => {
    const mockFile = new File(["test content"], "test.txt", {type: "text/plain"});

    const mockFileReader = {
      readAsDataURL: vi.fn(),
      result: "data:text/plain;base64,dGVzdCBjb250ZW50",
      onload: vi.fn(),
      onerror: vi.fn(),
    };

    window.FileReader = vi.fn(() => mockFileReader) as never;

    const promise = toBase64(mockFile);

    mockFileReader.onload(new Event("load"));

    await expect(promise).resolves.toBe("data:text/plain;base64,dGVzdCBjb250ZW50");

    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it("should reject with an error when file reading fails", async () => {
    const mockFile = new File(["test content"], "test.txt", {type: "text/plain"});

    const mockFileReader = {
      readAsDataURL: vi.fn(),
      onload: vi.fn(),
      onerror: vi.fn(),
    };

    window.FileReader = vi.fn(() => mockFileReader) as never;

    const promise = toBase64(mockFile);

    const mockError = new Error("File reading error");
    mockFileReader.onerror(mockError);

    await expect(promise).rejects.toEqual(mockError);

    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it("should handle different file types correctly", async () => {
    const testCases = [
      {
        file: new File(["image content"], "test.png", {type: "image/png"}),
        expectedType: "image/png",
      },
      {
        file: new File(["pdf content"], "test.pdf", {type: "application/pdf"}),
        expectedType: "application/pdf",
      },
      {
        file: new File(["javascript content"], "test.js", {type: "application/javascript"}),
        expectedType: "application/javascript",
      },
    ];

    for (const testCase of testCases) {
      const mockFileReader = {
        readAsDataURL: vi.fn(),
        result: `data:${testCase.expectedType};base64,${btoa("test content")}`,
        onload: vi.fn(),
        onerror: vi.fn(),
      };

      window.FileReader = vi.fn(() => mockFileReader) as never;

      const promise = toBase64(testCase.file);
      mockFileReader.onload(new Event("load"));

      await expect(promise).resolves.toContain(testCase.expectedType);
      expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(testCase.file);
    }
  });
});
