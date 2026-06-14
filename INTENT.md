# Mission

A JavaScript library for converting between integers and Roman numeral strings,
exporting its public API as named exports from `src/lib/main.js`.

## Required Capabilities

- `intToRoman(n)` — integer (1-3999) to Roman string (subtractive notation).
- `romanToInt(s)` — Roman string to integer; round-trip must hold.
- `isValidRoman(s)` — returns `true`/`false` for whether `s` is a valid strict
  subtractive Roman numeral string, WITHOUT throwing. (NEW)

## Requirements

- `intToRoman`/`romanToInt` throw `RangeError`/`TypeError` on invalid input.
- `isValidRoman` never throws; it returns a boolean for any string input.
- Comprehensive unit tests, including for `isValidRoman` (valid + invalid).

## Acceptance Criteria

- [x] `1994` to Roman is `"MCMXCIV"` and back; round-trip holds for 1-3999
- [x] `4` to Roman is `"IV"`
- [ ] `isValidRoman("MCMXCIV")` returns `true`
- [ ] `isValidRoman("IIII")` returns `false` (strict subtractive)
- [ ] `isValidRoman("hello")` returns `false` (no throw)
- [ ] `isValidRoman` is a named export from `src/lib/main.js`
- [ ] All unit tests pass, including new `isValidRoman` tests