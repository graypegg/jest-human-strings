export function strip<Values extends string | string[]>(
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
