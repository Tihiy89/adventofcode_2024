import { input_a_mini as input_a } from "./input.js";
console.time("part A");

const map = input_a()
  .split("\n")
  .map((i) => i.split(""));

const stat = [];
const processedPoints = {};
const figurePoints = {};

const directions = [
  // y ,x, инд.пред для обхода
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function pointIsProcessed(_r, _c) {
  return processedPoints[_r + "_" + _c] ? true : false;
}

function savePointIsProcessed(_r, _c, indSym) {
  figurePoints[indSym] = figurePoints[indSym] ?? [];
  figurePoints[indSym].push([_r, _c]);
  return (processedPoints[_r + "_" + _c] = indSym);
}

function AddSymInStat(_s) {
  const ind = stat.filter((i) => i[3] == _s).length;
  // индекс вида A0 , площ, перимА, вид клетки, секцииБ
  stat.push([_s + ind, 0, 0, _s, 0]);
  return _s + ind;
}
function findSymInStat(_s) {
  let res = stat.find((i) => i[0] == _s);
  return res;
}

function checkPoint(_r, _c, _indS) {
  if (pointIsProcessed(_r, _c)) {
    return;
  }

  savePointIsProcessed(_r, _c, _indS);
  const sym = map[_r][_c];
  const s = findSymInStat(_indS);
  // площадь
  s[1] += 1;

  //считаем периметр если клеткаи разные, если нет проверяем точку
  directions.map((d) => {
    const neigPoint = (map[_r + d[0]] ?? [])[_c + d[1]];
    if (sym != neigPoint) {
      s[2] += 1;
    } else {
      // neigPoint = текущей
      checkPoint(_r + d[0], _c + d[1], _indS);
    }
  });
}

function getSym(_r, _c) {
  return (map[_r] ?? [])[_c];
}

for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    if (!pointIsProcessed(row, col)) {
      const indSym = AddSymInStat(map[row][col]);
      checkPoint(row, col, indSym);
    }
  }
}

for (let row = -1; row <= map.length; row++) {
  let lp = -1,
    rp = -1;
  for (let col = 0; col < map[row].length; col++) {
    const p0 = getSym(row, col);
    const p1 = getSym(row + 1, col);
    if (p0 != p1) {
      while (false) {
        //
      }
    }
  }
}

console.log(
  "A",
  stat.reduce((s, i) => (s += i[1] * i[2]), 0)
);
console.log(
  "B",
  stat.reduce((s, i) => (s += i[1] * i[4]), 0)
);

console.timeEnd("part A");
