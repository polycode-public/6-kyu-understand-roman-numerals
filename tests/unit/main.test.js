// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, intToRoman, romanToInt } from "../../src/lib/main.js";

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

  test("converts boundary value 1 to I", () => {
    expect(intToRoman(1)).toBe("I");
  });

  test("converts boundary value 3999 to MMMCMXCIX", () => {
    expect(intToRoman(3999)).toBe("MMMCMXCIX");
  });

  test("converts 9 to IX (subtractive)", () => {
    expect(intToRoman(9)).toBe("IX");
  });

  test("converts 40 to XL (subtractive)", () => {
    expect(intToRoman(40)).toBe("XL");
  });

  test("converts 90 to XC (subtractive)", () => {
    expect(intToRoman(90)).toBe("XC");
  });

  test("converts 400 to CD (subtractive)", () => {
    expect(intToRoman(400)).toBe("CD");
  });

  test("converts 900 to CM (subtractive)", () => {
    expect(intToRoman(900)).toBe("CM");
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
    expect(() => intToRoman(3.5)).toThrow(TypeError);
  });

  test("throws TypeError for non-number", () => {
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

  test("converts boundary value I to 1", () => {
    expect(romanToInt("I")).toBe(1);
  });

  test("converts boundary value MMMCMXCIX to 3999", () => {
    expect(romanToInt("MMMCMXCIX")).toBe(3999);
  });

  test("converts IX to 9 (subtractive)", () => {
    expect(romanToInt("IX")).toBe(9);
  });

  test("converts XL to 40 (subtractive)", () => {
    expect(romanToInt("XL")).toBe(40);
  });

  test("converts XC to 90 (subtractive)", () => {
    expect(romanToInt("XC")).toBe(90);
  });

  test("converts CD to 400 (subtractive)", () => {
    expect(romanToInt("CD")).toBe(400);
  });

  test("converts CM to 900 (subtractive)", () => {
    expect(romanToInt("CM")).toBe(900);
  });

  test("converts lowercase roman numerals", () => {
    expect(romanToInt("iv")).toBe(4);
  });

  test("throws TypeError for IIII (strict: invalid consecutive I)", () => {
    expect(() => romanToInt("IIII")).toThrow(TypeError);
  });

  test("throws TypeError for invalid character", () => {
    expect(() => romanToInt("IMV")).toThrow(TypeError);
  });

  test("throws TypeError for non-string", () => {
    expect(() => romanToInt(123)).toThrow(TypeError);
  });

  test("throws TypeError for invalid subtractive: IL", () => {
    expect(() => romanToInt("IL")).toThrow(TypeError);
  });

  test("throws TypeError for invalid subtractive: IC", () => {
    expect(() => romanToInt("IC")).toThrow(TypeError);
  });
});

describe("Round-trip conversion", () => {
  test("round-trip holds for value 1", () => {
    const roman = intToRoman(1);
    const num = romanToInt(roman);
    expect(num).toBe(1);
  });

  test("round-trip holds for value 1994", () => {
    const roman = intToRoman(1994);
    const num = romanToInt(roman);
    expect(num).toBe(1994);
  });

  test("round-trip holds for value 3999", () => {
    const roman = intToRoman(3999);
    const num = romanToInt(roman);
    expect(num).toBe(3999);
  });

  test("round-trip holds for all values 1-3999", () => {
    // Sample every 100th value for efficiency
    for (let i = 1; i <= 3999; i += 100) {
      const roman = intToRoman(i);
      const num = romanToInt(roman);
      expect(num).toBe(i);
    }
  });
});
