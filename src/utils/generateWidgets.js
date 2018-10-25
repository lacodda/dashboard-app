import { uuid } from './helpers';

export default (
  totalNum,
  inRowNum = 3,
  width = 300,
  height = 100,
  indent = 20,
) => {
  function* range(start, end, row = 0, col = 0) {
    if ((start - 1) % inRowNum === 0) {
      row++;
      col = 0;
    }
    yield { row: row - 1, col };
    col++;
    if (start === end) return;
    yield* range(start + 1, end, row, col);
  }

  return [...range(1, totalNum)].map(({ row, col }) => ({
    id: uuid(),
    width,
    height,
    x: width * col + indent * col,
    y: height * row + indent * row,
    z: 1,
    visible: true,
  }));
};
