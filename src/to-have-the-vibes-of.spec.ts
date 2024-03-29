import { toHaveTheVibesOf } from "./to-have-the-vibes-of";

expect.extend({ toHaveTheVibesOf });

describe("toHaveTheVibesOf", () => {
  it("should match strings with regular spaces and thin spaces or no space at all", () => {
    // Thin space
    expect("my string").toHaveTheVibesOf("my string");
    expect("my string").toHaveTheVibesOf("mystring");

    // Hairline space
    expect("my string").toHaveTheVibesOf("my string");
    expect("my string").toHaveTheVibesOf("mystring");
  });

  it("should treat the punctuation space like a regular space", () => {
    expect("my string").toHaveTheVibesOf("my string");
    expect("my string").not.toHaveTheVibesOf("mystring");
  });

  it("should not match thin spaces to new lines", () => {
    expect("my string").not.toHaveTheVibesOf("my\nstring");
  });

  it("should match strings with regular spaces and wide spaces", () => {
    expect("my string").toHaveTheVibesOf("my string");
    //                ^ this is an EN space
    expect("my string").toHaveTheVibesOf("my string");
    //                ^ this is an EM space
    expect("my string").toHaveTheVibesOf("my string");
    //                ^ this is an EN Quad space
    expect("my string").toHaveTheVibesOf("my string");
    //                ^ this is an EM Quad space
    expect("my string").toHaveTheVibesOf("my string");
    //                ^ this is a figure space
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
    //                ^ this is a non-breaking hyphen.
    expect("my―string").toHaveTheVibesOf("my-string");
    //                ^ this is a horizontal bar.
  });
});
