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
  // if (!res) {
  //   stat.push([_s, 0, 0]);
  // }
  // res = stat.find((i) => i[0] == _s);
  return res;
}

function checkDirection(_p, _id) {
  const [y, x] = _p;
  // направление прямо
  const d1 = directions[_id];
  const y1 = y + d1[0],
    x1 = x + d1[1];

  // направление направо
  const d2 = directions[(_id + 1) % 4];
  const y2 = y + d2[0],
    x2 = x + d2[1];

  // направление налево
  const d3 = directions[(_id + 3) % 4];
  const y3 = y + d3[0],
    x3 = x + d3[1];

  const p0 = map[y][x],
    p1 = (map[y1] ?? [])[x1],
    p2 = (map[y2] ?? [])[x2],
    p3 = (map[y3] ?? [])[x3];

  //поворот налево
  if (p3 == p0) {
    return 3;
  }
  //прямо
  if (p1 == p0) {
    return 0;
  }
  //направо
  if (p2 == p0) {
    return 1;
  }
  return 2;

  // // разворот
  // return 2;
}

function getStartPoints(_indSym) {
  // верхний ряд, левая
  let first = [
    ...figurePoints[_indSym].sort((a, b) =>
      a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]
    )[0],
    0,
  ];

  const points = [];
  points.push(first);

  // внутренние разрывы

  return points;
}

function getSym(_r, _c) {
  return (map[_r] ?? [])[_c];
}

function pointIsBound(_r, _c) {
  const p0 = getSym(_r, _c);
  return (
    directions.map((i) => getSym(_r + i[0], _c + i[1])).filter((i) => i != p0)
      .length > 0
  );
}

function findInnerStartPoint(workPoints) {
  return workPoints
    .filter((i) => i[2] == false)
    .find((i) => pointIsBound(i[0], i[1]));
}

function calcPerim(_indSym) {
  // если 1 точка
  if (figurePoints[_indSym].length == 1) {
    stat.find((i) => i[0] == _indSym)[4] = 4;
    return;
  }

  const startPoint = getStartPoints(_indSym);
  let countSections = 0;

  while (startPoint.length > 0) {
    let start, first;
    first = startPoint.pop();

    const workPoints = [...figurePoints[_indSym].map((i) => [...i, false])];

    let dirValid = false;
    let idDir = 0;
    while (!dirValid) {
      if (checkDirection(first, ++idDir % 4) == 0) {
        dirValid = true;
      }
    }
    // первая точка с учетом направления
    first[2] = idDir;
    start = [...first];

    let endWay = false;
    let firstStep = true;
    while (!endWay) {
      dirValid = false;

      const newDir = checkDirection(start, start[2]);
      if (newDir == 0) {
        //
      } else if (newDir == 2) {
        countSections += 2;
        start[2] = (start[2] + 2) % 4;
      } else {
        countSections += 1;
        start[2] = (start[2] + newDir) % 4;
      }

      if (
        !firstStep &&
        start[0] == first[0] &&
        start[1] == first[1] &&
        start[2] == first[2]
      ) {
        endWay = true;
      }
      firstStep = false;

      const dir = directions[start[2]];
      start[0] += dir[0];
      start[1] += dir[1];

      workPoints.find((i) => i[0] == start[0] && i[1] == start[1])[2] = true;

      // if (endWay) {
      //   // const nextFirst = findInnerStartPoint(workPoints);
      //   // if (nextFirst) {
      //   //   startPoint.push([nextFirst[0], nextFirst[1], 0]);
      //   // }
      // }
    }
  }

  stat.find((i) => i[0] == _indSym)[4] = countSections;
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

stat.map((i) => {
  calcPerim(i[0]);
});

console.log(
  "A",
  stat.reduce((s, i) => (s += i[1] * i[2]), 0)
);
console.log(
  "B",
  stat.reduce((s, i) => (s += i[1] * i[4]), 0)
);

console.timeEnd("part A");
