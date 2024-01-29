import { toHaveTheVibesOf } from "./to-have-the-vibes-of";

expect.extend({ toHaveTheVibesOf });

describe("toHaveTheVibesOf", () => {
  it("should match strings with simple spaces and thin spaces", () => {
    expect("my string").toHaveTheVibesOf("my string");
  });

  it("should match strings with and without non-breaking non-space characters", () => {
    expect("mystring").toHaveTheVibesOf("my string");
  });
});
