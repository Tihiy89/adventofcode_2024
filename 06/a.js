import { input_a_mini as input_a } from "./input.js";

class Point {
  x;
  y;
  direction;
  valid = true;
}

const direction = {
  "^": [-1, 0, ">", "^"],
  ">": [0, 1, "v", ">"],
  v: [1, 0, "<", "v"],
  "<": [0, -1, "^", "<"],
};
const position = new Point();

let lab_map = input_a()
  .split("\n")
  .map((r, ind_r) =>
    r.split("").map((c, ind_c) => {
      if (c in direction) {
        position.x = ind_r;
        position.y = ind_c;
        position.direction = direction[c];
      }
      return c;
    })
  );

let step_a = 0;
const blocks = [];
while (position.valid) {
  const nextX = position.x + position.direction[0];
  const nextY = position.y + position.direction[1];
  const nextVal = (lab_map[nextX] ?? [])[nextY];
  if (nextVal == undefined) {
    step_a++;
    position.valid = false;
  }

  if (nextVal == "#") {
    blocks.push([position.x, position.y, position.direction[2]]);
    position.direction = direction[position.direction[2]];
  }

  if (nextVal == "." || nextVal == "X") {
    if (nextVal == ".") {
      step_a++;
    }
    lab_map[position.x][position.y] = "X";
    lab_map[nextX][nextY] = position.direction[3];
    position.x = nextX;
    position.y = nextY;
  }
}

lab_map = input_a()
  .split("\n")
  .map((r, ind_r) =>
    r.split("").map((c, ind_c) => {
      if (c in direction) {
        position.x = ind_r;
        position.y = ind_c;
        position.direction = direction[c];
      }
      return c;
    })
  );

const loops = [];
const blocks_new = [];
for (let pi = 0; pi < blocks.length - 3; pi++) {
  const route = [blocks[pi], blocks[pi + 1], blocks[pi + 2], blocks[pi + 3]];

  // искомая точка должна лежать между 3 и 4
  const d3 = Math.abs(route[3][1] - route[2][1] + route[3][0] - route[2][0]);
  const dx3 = route[3][1] - route[2][1];
  const dy3 = route[3][0] - route[2][0];
  const d1 = Math.abs(route[1][1] - route[0][1] + route[1][0] - route[0][0]);
  let dx1 = route[1][1] - route[0][1];
  let dy1 = route[1][0] - route[0][0];

  if (d3 - d1 > 0) {
    const lastDirection = route[2][2];
    if (lastDirection == "<") dx1 += 1;
    if (lastDirection == ">") dx1 -= 1;
    if (lastDirection == "^") dy1 += 1;
    if (lastDirection == "v") dy1 -= 1;

    loops.push(route);

    const bx = route[2][1] - dx1;
    const by = route[2][0] - dy1;

    blocks_new.push([by, bx]);
    lab_map[by][bx] = "O";
  }
}

console.log("A", step_a);
console.log("B", loops.length);
