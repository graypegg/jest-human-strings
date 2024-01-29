export function toHaveTheVibesOf(
  received: string,
  expected: string,
): jest.CustomMatcherResult {
  return {
    message(): string {
      return "alksjdflasjkdf";
    },
    pass: false,
  };
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTheVibesOf: (expected: string) => CustomMatcherResult;
    }
  }
}
