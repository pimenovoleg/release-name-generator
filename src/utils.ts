/**
 * Gets a random element from `array`.
 */
export const sample = (arr: any) => {
    const len = arr == null ? 0 : arr.length;
    return len && arr ? arr[Math.floor(Math.random() * len)] : undefined;
};

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * startCase('fooBar')
 * // => 'Foo Bar'
 */
export const startCase = (string: string) =>
    string
        .replace(/-/g, ' ')
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
