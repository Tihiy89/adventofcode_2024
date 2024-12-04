import { input_a as input_a } from "./input.js";

const matrix = input_a()
  .split("\n")
  .map((i) => i.split(""));

const sample = "AMS";
const dsample = [0, -1, 1];

function check_elem(matrix, row, col) {
  let count_xmas = 0;
  if (matrix[row][col] != "A") {
    return 0;
  }

  const valid_symbols = [1, 1, 1, 1, 1, 1, 1, 1];
  for (let i = 1; i < dsample.length; i++) {
    // //  _ |
    // valid_symbols[0] +=
    //   (matrix[row + dsample[i]] ?? [])[col] == sample[i] &&
    //   (matrix[row] ?? [])[col + dsample[i]] == sample[i]
    //     ? 1
    //     : 0;

    // //   | _
    // valid_symbols[1] +=
    //   (matrix[row] ?? [])[col + dsample[i]] == sample[i] &&
    //   (matrix[row - dsample[i]] ?? [])[col] == sample[i]
    //     ? 1
    //     : 0;

    // //     _
    // //   |
    // valid_symbols[2] +=
    //   (matrix[row - dsample[i]] ?? [])[col] == sample[i] &&
    //   (matrix[row] ?? [])[col - dsample[i]] == sample[i]
    //     ? 1
    //     : 0;

    // //  _
    // //    |
    // valid_symbols[3] +=
    //   (matrix[row] ?? [])[col - dsample[i]] == sample[i] &&
    //   (matrix[row + dsample[i]] ?? [])[col] == sample[i]
    //     ? 1
    //     : 0;

    // ТОЛЬКО диагонали
    valid_symbols[4] +=
      (matrix[row + dsample[i]] ?? [])[col - dsample[i]] == sample[i] &&
      (matrix[row + dsample[i]] ?? [])[col + dsample[i]] == sample[i]
        ? 1
        : 0;

    valid_symbols[5] +=
      (matrix[row + dsample[i]] ?? [])[col + dsample[i]] == sample[i] &&
      (matrix[row - dsample[i]] ?? [])[col + dsample[i]] == sample[i]
        ? 1
        : 0;

    valid_symbols[6] +=
      (matrix[row - dsample[i]] ?? [])[col + dsample[i]] == sample[i] &&
      (matrix[row - dsample[i]] ?? [])[col - dsample[i]] == sample[i]
        ? 1
        : 0;

    valid_symbols[7] +=
      (matrix[row - dsample[i]] ?? [])[col - dsample[i]] == sample[i] &&
      (matrix[row + dsample[i]] ?? [])[col - dsample[i]] == sample[i]
        ? 1
        : 0;
  }

  count_xmas += valid_symbols.filter((i) => i == sample.length).length;
  return count_xmas;
}

const vc = [];
let sum_a = 0;
for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    const valid = check_elem(matrix, row, col);
    vc[row] = vc[row] ?? [];
    vc[row][col] = valid;
    sum_a += valid;
  }
}

console.log("B", sum_a);
// console.log("B", sum_b);
