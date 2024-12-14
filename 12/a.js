import { input_a as input_a } from "./input.js";
console.time("part A");

const map = input_a()
  .split("\n")
  .map((i) => i.split(""));

const stat = [];
const processedPoints = {};

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function pointIsProcessed(_r, _c) {
  return processedPoints[_r + "_" + _c] ? true : false;
}

function savePointIsProcessed(_r, _c, indSym) {
  return (processedPoints[_r + "_" + _c] = indSym);
}

function AddSymInStat(_s) {
  const ind = stat.filter((i) => i[3] == _s).length;
  stat.push([_s + ind, 0, 0, _s]);
  return _s + ind;
}
function findSymInStat(_s) {
  let res = stat.find((i) => i[0] == _s);
  if (!res) {
    stat.push([_s, 0, 0]);
  }
  res = stat.find((i) => i[0] == _s);
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

for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    if (!pointIsProcessed(row, col)) {
      const indSym = AddSymInStat(map[row][col]);
      checkPoint(row, col, indSym);
    }
  }
}

console.log(
  "A",
  stat.reduce((s, i) => (s += i[1] * i[2]), 0)
);

console.timeEnd("part A");
