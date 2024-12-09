import { input_a as input_a } from "./input.js";

const symbols = {};
const map = input_a()
  .split("\n")
  .map((row, indRow) =>
    row.split("").map((val, indCol) => {
      if (val != ".") {
        symbols[val] = symbols[val] ?? [];
        symbols[val].push([indRow, indCol]);
      }
      return val;
    })
  );

function calcAntinodesCoordinatesB(p1, p2) {
  let valid = true;
  let k = 1;
  const res = [p1, p2];
  while (valid) {
    const a1x = p1[1] - k * (p2[1] - p1[1]);
    const a1y = p1[0] - k * (p2[0] - p1[0]);

    valid = (map[a1y] ?? [])[a1x] != undefined;
    if (valid) {
      res.push([a1y, a1x]);
    }
    k++;
  }

  valid = true;
  k = 1;
  while (valid) {
    const a1x = p2[1] - k * (p1[1] - p2[1]);
    const a1y = p2[0] - k * (p1[0] - p2[0]);

    valid = (map[a1y] ?? [])[a1x] != undefined;
    if (valid) {
      res.push([a1y, a1x]);
    }
    k++;
  }

  return res;
}

function calcAntinodesCoordinatesA(p1, p2) {
  const a1x = p1[1] - p2[1] + p1[1];
  const a1y = p1[0] - p2[0] + p1[0];

  const a2x = p2[1] - p1[1] + p2[1];
  const a2y = p2[0] - p1[0] + p2[0];

  const res = [];
  if ((map[a1y] ?? [])[a1x] != undefined) {
    res.push([a1y, a1x]);
  }
  if ((map[a2y] ?? [])[a2x] != undefined) {
    res.push([a2y, a2x]);
  }

  return res;
}

const antinodes = [];
for (let sym in symbols) {
  const coordinates = symbols[sym];
  for (let i = 0; i < coordinates.length; i++) {
    const p1 = coordinates[i];
    for (let j = i + 1; j < coordinates.length; j++) {
      const p2 = coordinates[j];

      antinodes.push(
        ...calcAntinodesCoordinatesB(p1, p2).map((i) => [...i, sym])
      );

      //
    }
  }

  //
}

antinodes.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]));

const antinodes_union = antinodes.reduce((union, i) => {
  // if (map[i[0]][i[1]] == ".") {
  //   map[i[0]][i[1]] = "#";
  // }
  const ind = i[0] + "_" + i[1];
  union[ind] = union[ind] ?? [];
  union[ind].push(i[2]);
  return union;
}, []);

console.log("A", Object.keys(antinodes_union).length);
