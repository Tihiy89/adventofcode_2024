import { input_a as input_a } from "./input.js";
console.time("part A");

const size = [101, 103];
// const size = [11, 7];
const step = 100;

const map = input_a()
  .split("\n")
  .map((i) => {
    const r = i.split(" ").map((i) => i.split("=")[1].split(",").map(Number));
    return [...r[0], ...r[1]];
  });
//

const pos = [0, 0, 0, 0];
const m2 = map.map((i) => {
  let [x, y, dx, dy] = i;
  let nx = (x + dx * step) % size[0];
  let ny = (y + dy * step) % size[1];

  nx = nx < 0 ? size[0] + nx : nx;
  ny = ny < 0 ? size[1] + ny : ny;

  let j = -1;
  if (nx < Math.round(size[0] / 2) - 1) {
    j = 0;
  } else if (nx > Math.round(size[0] / 2) - 1) {
    j = 1;
  }

  if (j != -1 && ny > Math.round(size[1] / 2) - 1) {
    j += 2;
  } else if (ny == Math.round(size[1] / 2) - 1) {
    j = -1;
  }
  if (pos[j] != undefined) {
    pos[j]++;
  }

  return [x, y, dx, dy, nx, ny, j];
});

function getMap(_mInput) {
  const map_res = [];
  for (let j = 0; j < size[1]; j++) {
    for (let i = 0; i < size[0]; i++) {
      map_res[j] = map_res[j] ?? [];
      const rob = _mInput.filter((it) => it[4] == i && it[5] == j);
      map_res[j][i] = rob.length ? "" + rob.length : ".";
    }
  }
  return map_res;
}

const map_res = getMap(m2);

console.log(
  "A",
  pos.reduce((s, i) => (s *= i), 1)
);
console.timeEnd("part A");
