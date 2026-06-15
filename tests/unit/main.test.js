// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import {
  main,
  getIdentity,
  name,
  version,
  description,
  intToRoman,
  romanToInt,
  isValidRoman,
} from "../../src/lib/main.js";

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Library Identity", () => {
  test("exports name, version, and description", () => {
    expect(typeof name).toBe("string");
    expect(typeof version).toBe("string");
    expect(typeof description).toBe("string");
    expect(name.length).toBeGreaterThan(0);
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test("getIdentity returns correct structure", () => {
    const identity = getIdentity();
    expect(identity).toEqual({ name, version, description });
  });
});

describe("intToRoman", () => {
  test("converts 1994 to MCMXCIV", () => {
    expect(intToRoman(1994)).toBe("MCMXCIV");
  });

  test("converts 4 to IV", () => {
    expect(intToRoman(4)).toBe("IV");
  });

  test("converts 1 to I", () => {
    expect(intToRoman(1)).toBe("I");
  });

  test("converts 3999 to MMMCMXCIX", () => {
    expect(intToRoman(3999)).toBe("MMMCMXCIX");
  });

  test("converts boundary values correctly", () => {
    expect(intToRoman(1)).toBe("I");
    expect(intToRoman(2)).toBe("II");
    expect(intToRoman(3)).toBe("III");
    expect(intToRoman(5)).toBe("V");
    expect(intToRoman(9)).toBe("IX");
    expect(intToRoman(10)).toBe("X");
    expect(intToRoman(40)).toBe("XL");
    expect(intToRoman(50)).toBe("L");
    expect(intToRoman(90)).toBe("XC");
    expect(intToRoman(100)).toBe("C");
    expect(intToRoman(400)).toBe("CD");
    expect(intToRoman(500)).toBe("D");
    expect(intToRoman(900)).toBe("CM");
    expect(intToRoman(1000)).toBe("M");
  });

  test("throws RangeError for 0", () => {
    expect(() => intToRoman(0)).toThrow(RangeError);
  });

  test("throws RangeError for 4000", () => {
    expect(() => intToRoman(4000)).toThrow(RangeError);
  });

  test("throws RangeError for negative numbers", () => {
    expect(() => intToRoman(-5)).toThrow(RangeError);
  });

  test("throws TypeError for non-integer", () => {
    expect(() => intToRoman(1.5)).toThrow(TypeError);
  });

  test("throws TypeError for non-numeric input", () => {
    expect(() => intToRoman("123")).toThrow(TypeError);
  });
});

describe("romanToInt", () => {
  test("converts MCMXCIV to 1994", () => {
    expect(romanToInt("MCMXCIV")).toBe(1994);
  });

  test("converts IV to 4", () => {
    expect(romanToInt("IV")).toBe(4);
  });

  test("converts I to 1", () => {
    expect(romanToInt("I")).toBe(1);
  });

  test("converts MMMCMXCIX to 3999", () => {
    expect(romanToInt("MMMCMXCIX")).toBe(3999);
  });

  test("converts boundary values correctly", () => {
    expect(romanToInt("I")).toBe(1);
    expect(romanToInt("II")).toBe(2);
    expect(romanToInt("III")).toBe(3);
    expect(romanToInt("V")).toBe(5);
    expect(romanToInt("IX")).toBe(9);
    expect(romanToInt("X")).toBe(10);
    expect(romanToInt("XL")).toBe(40);
    expect(romanToInt("L")).toBe(50);
    expect(romanToInt("XC")).toBe(90);
    expect(romanToInt("C")).toBe(100);
    expect(romanToInt("CD")).toBe(400);
    expect(romanToInt("D")).toBe(500);
    expect(romanToInt("CM")).toBe(900);
    expect(romanToInt("M")).toBe(1000);
  });

  test("handles lowercase input", () => {
    expect(romanToInt("mcmxciv")).toBe(1994);
    expect(romanToInt("iv")).toBe(4);
  });

  test("throws TypeError for IIII (invalid subtractive)", () => {
    expect(() => romanToInt("IIII")).toThrow(TypeError);
  });

  test("throws TypeError for invalid subtractive notation", () => {
    expect(() => romanToInt("IL")).toThrow(TypeError);
    expect(() => romanToInt("IC")).toThrow(TypeError);
    expect(() => romanToInt("ID")).toThrow(TypeError);
    expect(() => romanToInt("IM")).toThrow(TypeError);
    expect(() => romanToInt("XD")).toThrow(TypeError);
    expect(() => romanToInt("XM")).toThrow(TypeError);
    expect(() => romanToInt("VX")).toThrow(TypeError);
    expect(() => romanToInt("LC")).toThrow(TypeError);
    expect(() => romanToInt("DM")).toThrow(TypeError);
  });

  test("throws TypeError for invalid characters", () => {
    expect(() => romanToInt("ABCD")).toThrow(TypeError);
    expect(() => romanToInt("123")).toThrow(TypeError);
    expect(() => romanToInt("IXA")).toThrow(TypeError);
  });

  test("throws TypeError for empty string", () => {
    expect(() => romanToInt("")).toThrow(TypeError);
  });

  test("throws TypeError for non-string input", () => {
    expect(() => romanToInt(123)).toThrow(TypeError);
    expect(() => romanToInt(null)).toThrow(TypeError);
  });
});

describe("Round-trip conversion", () => {
  test("round-trip holds for boundary values", () => {
    expect(romanToInt(intToRoman(1))).toBe(1);
    expect(romanToInt(intToRoman(3999))).toBe(3999);
  });

  test("round-trip holds for all values in range", () => {
    for (let i = 1; i <= 3999; i++) {
      const roman = intToRoman(i);
      const back = romanToInt(roman);
      expect(back).toBe(i);
    }
  });

  test("round-trip holds for specific test cases", () => {
    const testCases = [1, 4, 9, 27, 49, 59, 93, 141, 163, 402, 575, 1994, 3999];
    for (const num of testCases) {
      expect(romanToInt(intToRoman(num))).toBe(num);
    }
  });
});

describe("isValidRoman", () => {
  test("returns true for valid Roman numerals", () => {
    expect(isValidRoman("I")).toBe(true);
    expect(isValidRoman("IV")).toBe(true);
    expect(isValidRoman("IX")).toBe(true);
    expect(isValidRoman("MCMXCIV")).toBe(true);
    expect(isValidRoman("MMMCMXCIX")).toBe(true);
    expect(isValidRoman("V")).toBe(true);
    expect(isValidRoman("X")).toBe(true);
    expect(isValidRoman("L")).toBe(true);
    expect(isValidRoman("C")).toBe(true);
    expect(isValidRoman("D")).toBe(true);
    expect(isValidRoman("M")).toBe(true);
  });

  test("returns false for invalid strict subtractive notation", () => {
    expect(isValidRoman("IIII")).toBe(false);
    expect(isValidRoman("IL")).toBe(false);
    expect(isValidRoman("IC")).toBe(false);
    expect(isValidRoman("ID")).toBe(false);
    expect(isValidRoman("IM")).toBe(false);
    expect(isValidRoman("VX")).toBe(false);
    expect(isValidRoman("VL")).toBe(false);
    expect(isValidRoman("VC")).toBe(false);
    expect(isValidRoman("VD")).toBe(false);
    expect(isValidRoman("VM")).toBe(false);
    expect(isValidRoman("XD")).toBe(false);
    expect(isValidRoman("XM")).toBe(false);
    expect(isValidRoman("LC")).toBe(false);
    expect(isValidRoman("LD")).toBe(false);
    expect(isValidRoman("LM")).toBe(false);
    expect(isValidRoman("DM")).toBe(false);
  });

  test("returns false for excessive repeats", () => {
    expect(isValidRoman("IIII")).toBe(false);
    expect(isValidRoman("VV")).toBe(false);
    expect(isValidRoman("XXXX")).toBe(false);
    expect(isValidRoman("LL")).toBe(false);
    expect(isValidRoman("CCCC")).toBe(false);
    expect(isValidRoman("DD")).toBe(false);
    expect(isValidRoman("MMMM")).toBe(false);
  });

  test("returns false for invalid characters", () => {
    expect(isValidRoman("hello")).toBe(false);
    expect(isValidRoman("ABCD")).toBe(false);
    expect(isValidRoman("123")).toBe(false);
    expect(isValidRoman("IXA")).toBe(false);
    expect(isValidRoman("XY")).toBe(false);
  });

  test("returns false for empty string", () => {
    expect(isValidRoman("")).toBe(false);
  });

  test("returns false for non-string input", () => {
    expect(isValidRoman(null)).toBe(false);
    expect(isValidRoman(undefined)).toBe(false);
    expect(isValidRoman(123)).toBe(false);
    expect(isValidRoman({})).toBe(false);
    expect(isValidRoman([])).toBe(false);
  });

  test("handles lowercase input", () => {
    expect(isValidRoman("mcmxciv")).toBe(true);
    expect(isValidRoman("iv")).toBe(true);
    expect(isValidRoman("iiii")).toBe(false);
  });

  test("returns false for values outside valid range", () => {
    expect(isValidRoman("MMMM")).toBe(false);
  });

  test("never throws", () => {
    expect(() => isValidRoman("MCMXCIV")).not.toThrow();
    expect(() => isValidRoman("hello")).not.toThrow();
    expect(() => isValidRoman(null)).not.toThrow();
    expect(() => isValidRoman(undefined)).not.toThrow();
    expect(() => isValidRoman(123)).not.toThrow();
  });
});
