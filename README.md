# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/polycode-public/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Getting Started

### Step 1: Create Your Repository

Click **"Use this template"** on the [repository0](https://github.com/polycode-public/repository0) page, or use the GitHub CLI:

```bash
gh repo create my-project --template polycode-public/repository0 --public --clone
cd my-project
```

### Step 2: Initialise with a Mission

Run the init workflow from the GitHub Actions tab (**agentic-lib-init** with mode=purge), or use the CLI:

```bash
npx @polycode-public/agentic-lib init --purge --mission 7-kyu-understand-fizz-buzz
```

This resets the repository to a clean state with your chosen intent in `INTENT.md`. The default intent is **fizz-buzz** (7-kyu).

#### Built-in Missions

agentic-lib ships with 20 built-in missions plus two special modes, graded using [Codewars kyu/dan](https://docs.codewars.com/concepts/kata/) difficulty:

| Mission | Kyu/Dan | Description |
|---------|---------|-------------|
| `random` | — | Randomly select from all built-in missions |
| `generate` | — | Ask the LLM to generate a novel mission |
| `8-kyu-remember-empty` | 8 kyu | Blank template |
| `8-kyu-remember-hello-world` | 8 kyu | Hello World |
| `7-kyu-understand-fizz-buzz` | 7 kyu | Classic FizzBuzz (default) |
| `6-kyu-understand-hamming-distance` | 6 kyu | Hamming distance (strings + bits) |
| `6-kyu-understand-roman-numerals` | 6 kyu | Roman numeral conversion |
| `5-kyu-apply-ascii-face` | 5 kyu | ASCII face art |
| `5-kyu-apply-string-utils` | 5 kyu | 10 string utility functions |
| `4-kyu-apply-cron-engine` | 4 kyu | Cron expression parser |
| `4-kyu-apply-dense-encoding` | 4 kyu | Dense binary encoding |
| `4-kyu-analyze-json-schema-diff` | 4 kyu | JSON Schema diff |
| `3-kyu-analyze-lunar-lander` | 3 kyu | Lunar lander simulation |
| `3-kyu-evaluate-time-series-lab` | 3 kyu | Time series analysis |
| `2-kyu-create-markdown-compiler` | 2 kyu | Markdown compiler |
| `2-kyu-create-plot-code-lib` | 2 kyu | Code visualization library |
| `1-kyu-create-ray-tracer` | 1 kyu | Ray tracer |
| `1-dan-create-c64-emulator` | 1 dan | C64 emulator |
| `1-dan-create-planning-engine` | 1 dan | Planning engine |
| `2-dan-create-self-hosted` | 2 dan | Self-hosted AGI vision |

List all available missions:

```bash
npx @polycode-public/agentic-lib iterate --list-missions
```

#### Write Your Own Mission

Edit `INTENT.md` directly — describe what you want to build, the features, requirements, and acceptance criteria as checkboxes:

```markdown
# Mission

Build a CLI tool that converts CSV files to formatted Markdown tables.

## Features
- Read CSV from file or stdin
- Auto-detect delimiter

## Acceptance Criteria
- [ ] Reading a CSV with 3 columns produces a 3-column Markdown table
- [ ] All unit tests pass
```

### Step 3: Enable GitHub Copilot and Configure Secrets

Add these secrets in **Settings > Secrets and variables > Actions**:

| Secret | How to create | Purpose |
|--------|---------------|---------|
| `COPILOT_GITHUB_TOKEN` | [Fine-grained PAT](https://github.com/settings/tokens?type=beta) with **GitHub Copilot** > Read | Authenticates with the Copilot SDK |
| `WORKFLOW_TOKEN` | [Classic PAT](https://github.com/settings/tokens) with **workflow** scope | Allows init to update workflow files |

Then in **Settings > Actions > General**:
- Workflow permissions: **Read and write permissions**
- Allow GitHub Actions to create PRs: **Checked**

### Step 4: Activate the Schedule

Workflows ship with schedule **off** by default. Activate them from the GitHub Actions tab by running **agentic-lib-schedule** with your desired frequency:

| Frequency | Workflow runs | Init runs | Test runs |
|-----------|--------------|-----------|-----------|
| continuous | Every 20 min | Every 4 hours | Every hour |
| hourly | Every hour | Every day | Every 4 hours |
| daily | Every day | Every week | Every day |
| weekly | Every week | Every month | Every week |
| off | Never | Never | Never |

## How It Works

```
INTENT.md -> [supervisor] -> dispatch workflows -> Issue -> Code -> Test -> PR -> Merge
                                                     ^                           |
                                                     +---------------------------+
```

The pipeline runs as GitHub Actions workflows. An LLM supervisor gathers repository context and dispatches other workflows. Each workflow uses the Copilot SDK to make targeted changes.

## Examples

Below are quick examples showing how to use the Roman numeral conversion library from this repository.

### Integer to Roman Conversion

Node (ESM):

```js
import { intToRoman } from './src/lib/main.js';

console.log(intToRoman(1994));  // "MCMXCIV"
console.log(intToRoman(4));     // "IV"
console.log(intToRoman(1));     // "I"
console.log(intToRoman(3999));  // "MMMCMXCIX"
```

### Roman to Integer Conversion

```js
import { romanToInt } from './src/lib/main.js';

console.log(romanToInt("MCMXCIV"));  // 1994
console.log(romanToInt("IV"));       // 4
console.log(romanToInt("I"));        // 1
console.log(romanToInt("MMMCMXCIX")); // 3999
```

### Round-trip Conversion

```js
import { intToRoman, romanToInt } from './src/lib/main.js';

const num = 1994;
const roman = intToRoman(num);      // "MCMXCIV"
const back = romanToInt(roman);     // 1994
console.log(num === back);          // true
```

Browser (via src/web/lib.js):

```html
<script type="module">
  import { intToRoman, romanToInt } from './src/web/lib.js';
  console.log(intToRoman(49));     // "XLIX"
  console.log(romanToInt("XLIX")); // 49
</script>
```

## Roman Numeral Conversion Table

| Integer | Roman | Integer | Roman | Integer | Roman |
|---------|-------|---------|-------|---------|-------|
| 1 | I | 11 | XI | 21 | XXI |
| 2 | II | 12 | XII | 30 | XXX |
| 3 | III | 13 | XIII | 40 | XL |
| 4 | IV | 14 | XIV | 50 | L |
| 5 | V | 15 | XV | 90 | XC |
| 6 | VI | 16 | XVI | 100 | C |
| 7 | VII | 17 | XVII | 400 | CD |
| 8 | VIII | 18 | XVIII | 500 | D |
| 9 | IX | 19 | XIX | 900 | CM |
| 10 | X | 20 | XX | 1000 | M |

## API

### `intToRoman(num: number): string`

Converts an integer (1–3999) to its Roman numeral representation using subtractive notation.

- **Parameters**: `num` — an integer between 1 and 3999 (inclusive)
- **Returns**: Roman numeral string
- **Throws**:
  - `TypeError` if input is not an integer
  - `RangeError` if input is outside 1–3999

**Example**:
```js
intToRoman(1994); // "MCMXCIV"
```

### `romanToInt(roman: string): string`

Converts a Roman numeral string back to an integer.

- **Parameters**: `roman` — a valid Roman numeral string (case-insensitive)
- **Returns**: integer between 1 and 3999
- **Throws**:
  - `TypeError` if input is not a valid Roman numeral string
  - `TypeError` if subtractive notation is used incorrectly (e.g., "IIII" instead of "IV")

**Example**:
```js
romanToInt("MCMXCIV"); // 1994
```

## Configuration

Edit `agentic-lib.toml` to tune the system:

```toml
[schedule]
supervisor = "off"          # off | weekly | daily | hourly | continuous
focus = "mission"           # mission | maintenance

[tuning]
profile = "max"             # min | med | max
model = "gpt-5-mini"       # gpt-5-mini | claude-sonnet-4 | gpt-4.1

[mission-complete]
acceptance-criteria-threshold = 50   # % of criteria that must be met
min-resolved-issues = 1              # minimum closed issues
```

## File Layout

```
src/lib/main.js              <- library (browser-safe)
src/web/index.html            <- web page (imports ./lib.js)
tests/unit/main.test.js       <- unit tests
tests/behaviour/              <- Playwright E2E
```

## Updating

The `init` workflow updates the agentic infrastructure automatically. To update manually:

```bash
npx @polycode-public/agentic-lib@latest init --purge
```

## Links

- [INTENT.md](INTENT.md) — your project goals
- [agentic-lib documentation](https://github.com/polycode-public/agentic-lib) — full SDK docs
- [intenti&ouml;n website](https://xn--intenton-z2a.com)
