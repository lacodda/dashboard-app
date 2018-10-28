import { uuid } from './helpers';

/**
 * Function to generate an array of widgets
 *
 * @param {Object} {
 *   totalNum,
 *   inRowNum,
 *   width,
 *   height,
 *   indent,
 *   getName,
 * }
 * @returns {Array}
 */
export default ({ totalNum, inRowNum, width, height, indent, getName }) => {
  function* range(start, end, row = 0, col = 0) {
    if ((start - 1) % inRowNum === 0) {
      row++;
      col = 0;
    }
    yield { row: row - 1, col, name: getName(start) };
    col++;
    if (start === end) return;
    yield* range(start + 1, end, row, col);
  }

  return [...range(1, totalNum)].map(({ row, col, name }) => ({
    id: uuid(),
    name,
    width,
    height,
    x: width * col + indent * col,
    y: height * row + indent * row,
    z: 1,
    visible: true,
  }));
};
