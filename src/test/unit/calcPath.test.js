import { describe, it, expect } from "vitest";
import { calcPath } from "../../utils/calcPath";

describe("calcPath", () => {
  it("returns empty path for null relationship", () => {
    expect(calcPath(null)).toBe("");
  });

  it("builds a direct line path when rows align closely", () => {
    const path = calcPath(
      {
        startTable: { x: 0, y: 0, comment: "" },
        endTable: { x: 250, y: 0, comment: "" },
        startFieldIndex: 0,
        endFieldIndex: 0,
      },
      200,
      1,
      false,
    );

    expect(path).toContain("M 200 68 L 250 68.1");
  });

  it("builds a curved path when tables overlap horizontally", () => {
    const path = calcPath(
      {
        startTable: { x: 0, y: 0, comment: "" },
        endTable: { x: 100, y: 100, comment: "" },
        startFieldIndex: 1,
        endFieldIndex: 2,
      },
      200,
      1,
      false,
    );

    expect(path).toContain("A 10 10 0 0 1");
    expect(path.startsWith("M ")).toBe(true);
  });
});
