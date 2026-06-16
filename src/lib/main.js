#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  pkg = requireFn("../../package.json");
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title, version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
}

export function intToRoman(num) {
  if (!Number.isInteger(num)) {
    throw new TypeError("Input must be an integer");
  }
  if (num < 1 || num > 3999) {
    throw new RangeError("Input must be between 1 and 3999");
  }

  const romanMap = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";
  for (const { value, numeral } of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

export function romanToInt(roman) {
  if (typeof roman !== "string") {
    throw new TypeError("Input must be a string");
  }

  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const upperRoman = roman.toUpperCase();
  if (!/^[IVXLCDM]+$/.test(upperRoman)) {
    throw new TypeError("Invalid Roman numeral string");
  }

  // Check for consecutive repeats exceeding the allowed limit
  if (/IIII|VV|XXXX|LL|CCCC|DD|MMMM/.test(upperRoman)) {
    throw new TypeError("Invalid Roman numeral: too many consecutive repeats");
  }

  let result = 0;
  for (let i = 0; i < upperRoman.length; i++) {
    const current = romanMap[upperRoman[i]];
    const next = romanMap[upperRoman[i + 1]];

    if (next && current < next) {
      if (!isValidSubtractive(upperRoman[i], upperRoman[i + 1])) {
        throw new TypeError("Invalid subtractive notation");
      }
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }

  if (result < 1 || result > 3999) {
    throw new TypeError("Roman numeral represents value outside 1-3999 range");
  }

  return result;
}

function isValidSubtractive(smaller, larger) {
  const validPairs = new Set([
    "IV",
    "IX",
    "XL",
    "XC",
    "CD",
    "CM",
  ]);
  return validPairs.has(smaller + larger);
}

export function isValidRoman(s) {
  if (typeof s !== "string") {
    return false;
  }

  if (s.length === 0) {
    return false;
  }

  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const upperRoman = s.toUpperCase();

  // Check if all characters are valid Roman numerals
  if (!/^[IVXLCDM]+$/.test(upperRoman)) {
    return false;
  }

  // Check for consecutive repeats exceeding the allowed limit
  if (/IIII|VV|XXXX|LL|CCCC|DD|MMMM/.test(upperRoman)) {
    return false;
  }

  // Check for invalid subtractive notation
  for (let i = 0; i < upperRoman.length - 1; i++) {
    const current = romanMap[upperRoman[i]];
    const next = romanMap[upperRoman[i + 1]];

    if (next && current < next) {
      if (!isValidSubtractive(upperRoman[i], upperRoman[i + 1])) {
        return false;
      }
    }
  }

  // Verify the value is in valid range
  try {
    const value = romanToInt(upperRoman);
    return value >= 1 && value <= 3999;
  } catch {
    return false;
  }
}

export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}

// demo() — exercised by src/web/lib.js renderDemo for the showcase screenshot.
export const demo = () => ({ "intToRoman(1994)": intToRoman(1994), "romanToInt(\"MCMXCIV\")": romanToInt("MCMXCIV") });
