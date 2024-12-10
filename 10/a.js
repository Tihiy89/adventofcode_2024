import { input_a as input_a } from "./input.js";
console.time("part A");

const map0 = [];
const map = input_a()
  .split("\n")
  .map((i, row) =>
    i.split("").map((i, col) => {
      const ii = Number(i);
      if (ii == 0) {
        map0.push([ii, row, col]);
      }
      return ii;
    })
  );

function findNextPoint(point) {
  const [val, row, col] = point;
  const res = [];

  if ((map[row - 1] ?? [])[col] == val + 1) {
    res.push([val + 1, row - 1, col]);
  }

  if ((map[row + 1] ?? [])[col] == val + 1) {
    res.push([val + 1, row + 1, col]);
  }

  if ((map[row] ?? [])[col - 1] == val + 1) {
    res.push([val + 1, row, col - 1]);
  }

  if ((map[row] ?? [])[col + 1] == val + 1) {
    res.push([val + 1, row, col + 1]);
  }

  return res;
}

const mA = [];

function findRoute(route_in) {
  const point = route_in[route_in.length - 1];
  const [val] = point;
  if (val == 9) {
    const start = route_in[0];
    const end = route_in[route_in.length - 1];
    if (
      !mA.find(
        (i) =>
          i[0] == start[1] &&
          i[1] == start[2] &&
          i[2] == end[1] &&
          i[3] == end[2]
      )
    ) {
      mA.push([start[1], start[2], end[1], end[2]]);
    }
    return [route_in];
  }

  const newPoints = findNextPoint(point);
  let route_out = [];
  if (newPoints.length > 0) {
    route_out = newPoints.reduce((rrr, i) => {
      rrr.push(...findRoute([...route_in, i]));
      return rrr;
    }, []);
  }

  return route_out;
}

const routes = map0.map((i) => {
  const res = findRoute([i]);
  return res;
});

console.log("A", mA.length);
console.log(
  "B",
  routes.reduce((s, i) => (s += i.length), 0)
);
console.timeEnd("part A");
