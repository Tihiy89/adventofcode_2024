// no_valid

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
// const position = new Point();

function getMap() {
  const position = new Point();
  const lab_map = input_a()
    .split("\n")
    .map((r, ind_r) =>
      r.split("").map((c, ind_c) => {
        if (c in direction) {
          position.x = ind_c;
          position.y = ind_r;
          position.direction = direction[c];
        }
        return c;
      })
    );

  return { position, lab_map };
}

function checkMap(map_in) {
  let step_a = 0;
  const blocks = [];
  const way_points = [];
  let isLoop = false;
  const { lab_map, position } = map_in ?? getMap();
  lab_map[position.y][position.x] = "s";

  while (position.valid) {
    const nextX = position.x + position.direction[1];
    const nextY = position.y + position.direction[0];
    const nextVal = (lab_map[nextY] ?? [])[nextX];
    if (nextVal == undefined) {
      step_a++;
      position.valid = false;
    }

    if (nextVal == "#" && position.valid) {
      lab_map[position.y][position.x] = "+";
      blocks.push([position.y, position.x, position.direction[2]]);
      position.direction = direction[position.direction[2]];
    }

    if ([".", "X", "|", "-", "+", "s"].includes(nextVal) && position.valid) {
      if (!["+", "s"].includes(lab_map[position.y][position.x])) {
        lab_map[position.y][position.x] =
          way_points.find((i) => i[0] == position.y && i[1] == position.x) ==
          undefined
            ? ["^", "v"].includes(position.direction[3])
              ? "|"
              : "-"
            : "+";
      }

      if (
        !way_points.find(
          (item) => item[0] == position.y && item[1] == position.x
        )
      ) {
        way_points.push([position.y, position.x, position.direction[3]]);
        step_a++;
      }

      if (lab_map[nextY][nextX] != "s") {
        lab_map[nextY][nextX] = position.direction[3];
      }
      position.x = nextX;
      position.y = nextY;
    }
    if (
      way_points.find(
        (i) =>
          i[0] == position.y &&
          i[1] == position.x &&
          i[2] == position.direction[3]
      ) != undefined
    ) {
      isLoop = true;
      position.valid = false;
    }
  }

  return { step: step_a, blocks, way_points, lab_map, isLoop };
}

const a = checkMap();
const { way_points } = a;
const susp_points = [];

way_points.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]));

let sum_loop = 0;
for (let i1 = 0; i1 < a.lab_map.length; i1++) {
  for (let i2 = 0; i2 < a.lab_map[i1].length; i2++) {
    console.log(
      `Check way ${i1}/${a.lab_map.length}  ${i2}/${a.lab_map[i1].length}`
    );

    const map = getMap();
    if (map.lab_map[i1][i2] == ".") {
      map.lab_map[i1][i2] = "#";

      const aaa = checkMap(map);
      const { isLoop } = aaa;
      sum_loop += isLoop ? 1 : 0;

      // susp_test
      if (isLoop && !way_points.find((i) => i[0] == i1 && i[1] == i2)) {
        susp_points.push([i1, i2, aaa]);
      }
    }
  }
}

console.log("A", a.step);
console.log("B", sum_loop);
// console.log(
//   getMap()
//     .lab_map.map((i) => i.join(""))
//     .join("\n")
// );

// console.log("");
// console.log(a.lab_map.map((i) => i.join("")).join("\n"));
