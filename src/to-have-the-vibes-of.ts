import dedent from "dedent";
import { diff, diffStringsUnified } from "jest-diff";
import { strip } from "./strip";
import {
  describeHorribleCharactersIn,
  MATCH_TINY_SPACES,
  matching,
  THE_REGULAR_SPACE,
} from "./library-of-horrible-characters";

export function toHaveTheVibesOf(
  received: string,
  expected: string,
): jest.CustomMatcherResult {
  const [collapsedReceived, collapsedExpected] = strip(
    [received, expected],
    [MATCH_TINY_SPACES, matching(THE_REGULAR_SPACE)],
  );

  const doesLookTheSameWhenIgnoringSmallOrInvisibleSpaces =
    collapsedReceived === collapsedExpected;

  return {
    message(): string {
      let why: string = "";
      let aAnnotation = "Expected";
      let bAnnotation = "Received";

      if (!doesLookTheSameWhenIgnoringSmallOrInvisibleSpaces) {
        why +=
          "Thin space characters cannot be compared to large spaces or new lines as they are visually different when shown in a proportional font.";

        aAnnotation += ` (${describeHorribleCharactersIn(expected).join(", ")})`;
        bAnnotation += ` (${describeHorribleCharactersIn(received).join(", ")})`;
      }

      return dedent`
        ${why}
        ${diffStringsUnified(expected, received, { aAnnotation, bAnnotation, includeChangeCounts: true })}
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
