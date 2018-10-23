/**
 * Calculate z-index based on timestamp
 *
 * @returns {number}
 */
export const zIndex = () => Math.floor(Date.now() / 1000);

/**
 * Reduce the number of 10 000 -> 10K
 * @param {number} num
 * @param {number} digits - number of characters after the decimal point
 * @returns {string}
 */
export const shortenLargeNumber = (num, digits) => {
  const units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  let decimal;

  for (let i = units.length - 1; i >= 0; i -= 1) {
    /* eslint-disable */
    decimal = Math.pow(1000, i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(digits) + units[i];
    }
  }

  return num;
};
