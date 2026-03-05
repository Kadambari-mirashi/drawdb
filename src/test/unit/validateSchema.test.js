import { describe, it, expect } from "vitest";
import { jsonDiagramIsValid, ddbDiagramIsValid } from "../../utils/validateSchema";

const baseDiagram = {
  tables: [
    {
      id: 1,
      name: "users",
      x: 0,
      y: 0,
      fields: [
        {
          id: 10,
          name: "id",
          type: "INT",
          default: "",
          check: "",
          primary: true,
          unique: true,
          notNull: true,
          increment: true,
          comment: "",
        },
      ],
      comment: "",
      indices: [],
      color: "#175e7a",
    },
  ],
  relationships: [],
  notes: [],
  subjectAreas: [],
};

describe("validateSchema", () => {
  it("accepts a valid JSON diagram", () => {
    expect(jsonDiagramIsValid(baseDiagram)).toBe(true);
  });

  it("rejects diagram with missing required fields", () => {
    const invalid = { ...baseDiagram };
    delete invalid.relationships;
    expect(jsonDiagramIsValid(invalid)).toBe(false);
  });

  it("accepts valid DDB metadata wrapper", () => {
    const ddbDiagram = {
      ...baseDiagram,
      author: "test",
      project: "course",
      title: "schema",
      date: "2026-03-05",
    };
    expect(ddbDiagramIsValid(ddbDiagram)).toBe(true);
  });
});
