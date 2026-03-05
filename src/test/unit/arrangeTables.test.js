import { describe, it, expect } from "vitest";
import { arrangeTables } from "../../utils/arrangeTables";
import {
  tableFieldHeight,
  tableHeaderHeight,
  tableColorStripHeight,
} from "../../data/constants";

describe("arrangeTables", () => {
  it("places first half of tables in the first row", () => {
    const diagram = {
      tables: [
        { fields: [{}, {}] },
        { fields: [{}] },
        { fields: [{}] },
        { fields: [{}] },
      ],
    };

    arrangeTables(diagram);

    expect(diagram.tables[0].x).toBe(54);
    expect(diagram.tables[1].x).toBe(308);
    expect(diagram.tables[0].y).toBe(40);
    expect(diagram.tables[1].y).toBe(40);
  });

  it("places second-row tables below the tallest first-row table", () => {
    const diagram = {
      tables: [
        { fields: [{}, {}, {}] },
        { fields: [{}] },
        { fields: [{}] },
        { fields: [{}, {}] },
      ],
    };

    arrangeTables(diagram);

    const tallestTopRowHeight =
      3 * tableFieldHeight + tableHeaderHeight + tableColorStripHeight;
    const expectedSecondRowY = tallestTopRowHeight + 80;

    expect(diagram.tables[2].y).toBe(expectedSecondRowY);
    expect(diagram.tables[3].y).toBe(expectedSecondRowY);
  });
});
