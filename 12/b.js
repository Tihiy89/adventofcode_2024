import { input_a as input_a } from "./input.js";
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

function getIndPoint(_r, _c) {
  return processedPoints[_r + "_" + _c] ?? "";
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

function checkRotation(_y, _x) {
  const sym = getSym(_y, _x);
  // символы по кругу от точки
  const pU = [_y + directions[0][0], _x + directions[0][1]];
  const sU = getSym(...pU);
  const pUR = [
    _y + directions[0][0] + directions[1][0],
    _x + directions[0][1] + directions[1][1],
  ];
  const sUR = getSym(...pUR);
  const pR = [_y + directions[1][0], _x + directions[1][1]];
  const sR = getSym(...pR);
  const pDR = [
    _y + directions[2][0] + directions[1][0],
    _x + directions[2][1] + directions[1][1],
  ];
  const sDR = getSym(...pDR);
  const pD = [_y + directions[2][0], _x + directions[2][1]];
  const sD = getSym(...pD);
  const pDL = [
    _y + directions[2][0] + directions[3][0],
    _x + directions[2][1] + directions[3][1],
  ];
  const sDL = getSym(...pDL);
  const pL = [_y + directions[3][0], _x + directions[3][1]];
  const sL = getSym(...pL);
  const pUL = [
    _y + directions[0][0] + directions[3][0],
    _x + directions[0][1] + directions[3][1],
  ];
  const sUL = getSym(...pUL);

  let angle = 0;
  // внутренние углы
  if (sU == sym && sR == sym && sUR != sym) {
    angle++;
  }
  if (sR == sym && sD == sym && sDR != sym) {
    angle++;
  }
  if (sL == sym && sD == sym && sDL != sym) {
    angle++;
  }
  if (sL == sym && sU == sym && sUL != sym) {
    angle++;
  }
  // наружние углы
  if (sU != sym && sR != sym) {
    angle++;
  }
  if (sD != sym && sR != sym) {
    angle++;
  }
  if (sD != sym && sL != sym) {
    angle++;
  }
  if (sU != sym && sL != sym) {
    angle++;
  }

  const stat = findSymInStat(getIndPoint(_y, _x));
  stat[4] += angle;

  return;
}

for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    checkRotation(row, col);
    // getIndPoint

    //
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
