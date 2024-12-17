import { input_a as input_a } from "./input.js";
console.time("part A");
const start = [0, 0];

const [m, w] = input_a().split("\n\n");
const map = m.split("\n").map((i, row) =>
  i.split("").map((ii, col) => {
    if (ii == "@") {
      start[0] = row;
      start[1] = col;
    }
    return ii;
  })
);

let position = [...start];

const steps = w.split("\n").join("").split("");
const directions = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

for (let i = 0; i < steps.length; i++) {
  calcStep(steps[i]);
}

function getPoint(y, x) {
  return (map[y] ?? [])[x];
}

function findFreePoint(y, x, dy, dx) {
  let pos = [y, x];
  let point = getPoint(pos[0], pos[1]);

  while (point == "O") {
    pos = [pos[0] + dy, pos[1] + dx];
    point = getPoint(pos[0], pos[1]);
  }

  if (point == ".") {
    map[y][x] = ".";
    map[pos[0]][pos[1]] = "O";
  }
}

function calcStep(step) {
  const newY = position[0] + directions[step][0];
  const newX = position[1] + directions[step][1];

  let pointMap = getPoint(newY, newX);
  if (pointMap == "O") {
    findFreePoint(newY, newX, directions[step][0], directions[step][1]);
  }
  pointMap = getPoint(newY, newX);

  if (pointMap == ".") {
    map[position[0]][position[1]] = ".";
    map[newY][newX] = "@";
    position = [newY, newX];
  }
}

let sumGps = 0;
map.map((row, irow) => {
  row.map((col, icol) => {
    if (col == "O") {
      sumGps += 100 * irow + icol;
    }
  });
});

console.log("A", sumGps);
console.timeEnd("part A");
