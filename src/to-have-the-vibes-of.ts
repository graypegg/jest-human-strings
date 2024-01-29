import dedent from "dedent";
import { diff } from "jest-diff";

const TINY_SPACES = /[   ]/g;
const REGULAR_SPACES = / /g;

function strip<Values extends string | string[]>(
  value: Values,
  regex: RegExp | RegExp[],
): Values {
  if (Array.isArray(value)) {
    return value.map((str) => strip(str, regex)) as Values;
  }

  if (!Array.isArray(regex)) return value.replace(regex, "") as Values;

  if (regex.length === 0) return value;

  return strip(strip(value, regex.at(-1)), regex.slice(0, -1));
}

export function toHaveTheVibesOf(
  received: string,
  expected: string,
): jest.CustomMatcherResult {
  const [collapsedReceived, collapsedExpected] = strip(
    [received, expected],
    TINY_SPACES,
  );

  const doesLookTheSameWhenIgnoringSmallOrInvisibleSpaces =
    collapsedReceived === collapsedExpected;

  return {
    message(): string {
      return dedent`
      Oh no
      ${diff(expected, received)}
      `;
    },
    pass: doesLookTheSameWhenIgnoringSmallOrInvisibleSpaces,
  };
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTheVibesOf: (expected: string) => CustomMatcherResult;
    }
  }
}
