import { toHaveTheVibesOf } from "./to-have-the-vibes-of";

expect.extend({ toHaveTheVibesOf });

describe("toHaveTheVibesOf", () => {
  it("should match strings with simple spaces and thin spaces", () => {
    expect("my string").toHaveTheVibesOf("my string");
  });

  it("should match strings with narrow non-breaking spaces to a regular space or no space at all, but not to a new line", () => {
    expect("my string").toHaveTheVibesOf("my string");
    expect("my string").toHaveTheVibesOf("mystring");
    expect("my string").not.toHaveTheVibesOf("my\nstring");
  });

  it("should match strings with non-breaking spaces to a regular space, but not to a new line or no space at all", () => {
    expect("my string").toHaveTheVibesOf("my string");
    expect("my string").not.toHaveTheVibesOf("mystring");
    expect("my string").not.toHaveTheVibesOf("my\nstring");
  });

  it("should match all horizontal lines", () => {
    expect("my–string").toHaveTheVibesOf("my-string");
    //                ^ this is an EN dash.
    expect("my—string").toHaveTheVibesOf("my-string");
    //                ^ this is an EM dash.
    expect("my‒string").toHaveTheVibesOf("my-string");
    //                ^ this is a figure dash.
    expect("my‑string").toHaveTheVibesOf("my-string");
    //                ^ this is a non-breaking hypen.
    expect("my―string").toHaveTheVibesOf("my-string");
    //                ^ this is a horizontal bar.
  });
});
