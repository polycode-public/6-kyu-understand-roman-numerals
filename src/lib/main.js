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

// Roman numeral conversion library functions

const romanSymbols = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

export function intToRoman(num) {
  if (typeof num !== "number") {
    throw new TypeError("Input must be a number");
  }
  if (!Number.isInteger(num)) {
    throw new TypeError("Input must be an integer");
  }
  if (num < 1 || num > 3999) {
    throw new RangeError("Number must be between 1 and 3999");
  }

  let result = "";
  let remaining = num;

  for (const { value, symbol } of romanSymbols) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
}

export function romanToInt(roman) {
  if (typeof roman !== "string") {
    throw new TypeError("Input must be a string");
  }

  const romanValues = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  const validSubtractive = {
    I: ["V", "X"],
    X: ["L", "C"],
    C: ["D", "M"],
  };

  let result = 0;
  const uppercase = roman.toUpperCase();

  // Validate characters
  for (const char of uppercase) {
    if (!(char in romanValues)) {
      throw new TypeError("Invalid Roman numeral character");
    }
  }

  for (let i = 0; i < uppercase.length; i++) {
    const currentValue = romanValues[uppercase[i]];
    const nextValue = i + 1 < uppercase.length ? romanValues[uppercase[i + 1]] : 0;

    if (nextValue > currentValue) {
      // Subtractive case
      const current = uppercase[i];
      const next = uppercase[i + 1];

      // Verify valid subtractive combination
      if (!(current in validSubtractive) || !validSubtractive[current].includes(next)) {
        throw new TypeError(`Invalid Roman numeral: ${current} cannot precede ${next}`);
      }

      result += nextValue - currentValue;
      i++; // Skip next character as we've processed it
    } else {
      result += currentValue;
    }
  }

  // Validate the result is in valid range
  if (result < 1 || result > 3999) {
    throw new TypeError("Roman numeral converts to invalid number");
  }

  // Round-trip validation: convert back to Roman and compare
  const roundTrip = intToRoman(result);
  if (roundTrip !== uppercase) {
    throw new TypeError("Invalid Roman numeral (strict subtractive notation required)");
  }

  return result;
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
