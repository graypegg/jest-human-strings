import dedent from "dedent";
import { diff, diffStringsUnified } from "jest-diff";
import { strip } from "./strip";
import {
  describeHorribleCharactersIn,
  MATCH_LARGE_SPACES,
  MATCH_SMALL_TO_TINY_SPACES,
  MATCH_THE_LINE_BREAK_STOPPER_SPACES,
  matching,
  PUNCTUATION_SPACE,
  THE_REGULAR_SPACE,
} from "./library-of-horrible-characters";

export function toHaveTheVibesOf(
  received: string,
  expected: string,
): jest.CustomMatcherResult {
  const [collapsedReceived, collapsedExpected] = strip(
    [received, expected],
    [
      MATCH_SMALL_TO_TINY_SPACES,
      matching(THE_REGULAR_SPACE),
      MATCH_LARGE_SPACES,
    ],
  );

  const doesMatchByCollapsingSpaceCharacters =
    collapsedReceived === collapsedExpected;

  const [breakableReceived, breakableExpected] = strip(
    [received, expected],
    [MATCH_THE_LINE_BREAK_STOPPER_SPACES],
  );

  const doesHaveSimilarLineBreakRules = breakableReceived === breakableExpected;

  const [
    similarToRegularSpaceCharsToSpacesReceived,
    similarToRegularSpaceCharsToSpacesExpected,
  ] = strip(
    [received, expected],
    [matching([PUNCTUATION_SPACE, THE_REGULAR_SPACE])],
  );

  const doesHaveRegularSpaceCompatibleSpaces =
    similarToRegularSpaceCharsToSpacesReceived ===
    similarToRegularSpaceCharsToSpacesExpected;

  return {
    message(): string {
      let why: string = "";
      let suggestion = "";
      const aAnnotation = `Expected (${describeHorribleCharactersIn(expected).join(", ")})`;
      const bAnnotation = `Received (${describeHorribleCharactersIn(received).join(", ")})`;

      if (
        !doesMatchByCollapsingSpaceCharacters ||
        !doesHaveRegularSpaceCompatibleSpaces
      ) {
        why +=
          "* they will appear significantly different at runtime. (HUGE spaces or very small spaces.)\n";

        if (!suggestion)
          suggestion =
            'Use the "looserVibes: true" option if you\'d like these to pass.';
      }

      if (!doesHaveSimilarLineBreakRules) {
        why +=
          "* they will act differently at runtime. (Change character flow or prevent new-lines.)\n";

        if (!suggestion)
          suggestion =
            'Use the "looserVibes: true" option if you\'d like these to pass.';
      }

      return dedent`
        The characters present are incompatible, because:
        ${why}
        ${suggestion}
        ${diffStringsUnified(expected, received, { aAnnotation, bAnnotation, includeChangeCounts: true })}
      `;
    },
    pass:
      doesMatchByCollapsingSpaceCharacters &&
      doesHaveSimilarLineBreakRules &&
      doesHaveRegularSpaceCompatibleSpaces,
  };
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTheVibesOf: (expected: string) => CustomMatcherResult;
    }
  }
}
