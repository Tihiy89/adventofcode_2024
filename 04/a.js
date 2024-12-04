import { input_a as input_a } from "./input.js";

const matrix = input_a()
  .split("\n")
  .map((i) => i.split(""));

const sample = "XMAS";

//
function check_elem(matrix, row, col) {
  let count_xmas = 0;
  if (matrix[row][col] != "X") {
    return 0;
  }

  const valid_symbols = [1, 1, 1, 1, 1, 1, 1, 1];
  for (let i = 1; i < sample.length; i++) {
    valid_symbols[0] += (matrix[row - i] ?? [])[col] == sample[i] ? 1 : 0;
    valid_symbols[1] += (matrix[row + i] ?? [])[col] == sample[i] ? 1 : 0;
    valid_symbols[2] += (matrix[row] ?? [])[col - i] == sample[i] ? 1 : 0;
    valid_symbols[3] += (matrix[row] ?? [])[col + i] == sample[i] ? 1 : 0;
    // диагонали
    valid_symbols[4] += (matrix[row - i] ?? [])[col - i] == sample[i] ? 1 : 0;
    valid_symbols[5] += (matrix[row + i] ?? [])[col - i] == sample[i] ? 1 : 0;
    valid_symbols[6] += (matrix[row - i] ?? [])[col + i] == sample[i] ? 1 : 0;
    valid_symbols[7] += (matrix[row + i] ?? [])[col + i] == sample[i] ? 1 : 0;
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

console.log("A", sum_a);
// console.log("B", sum_b);
