import { input_a as input_a } from "./input.js";
console.time("part A");

const D = 10000000000000;
// const D = 0;

const map = input_a()
  .split("\n\n")
  .map((conf) => conf.split("\n").map((row) => row.split(":")[1]))
  .map((conf, i) => {
    console.log(`test ${i} `);
    const [bA, bB, prize] = conf;
    const [aX, aY] = bA.split(",").map((i) => Number(i.split("+")[1]));
    const [bX, bY] = bB.split(",").map((i) => Number(i.split("+")[1]));
    const [pX, pY] = prize.split(",").map((i) => Number(i.split("=")[1]) + D);
    const check = checkPrize(aX, aY, bX, bY, pX, pY);

    return [conf, check];

    //
  });

function delimeters(num) {
  const res = [];
  for (let i = 1; i < num; i++) {
    if (num % i == 0) {
      res.push(i);
    }
  }
  return res;
}

function costSol(cA, cB) {
  return 3 * cA + cB;
}

function matrix(aX, aY, bX, bY, pX, pY) {
  let x1 = 1; //делим на aX
  let y1 = bX / aX;
  let z1 = pX / aX;

  let x2 = aY - aY * x1;
  let y2 = bY - aY * y1;
  let z2 = pY - aY * z1;

  y2 = y2 / y2;
  z2 = z2 / y2;

  z1 = z1 - z2 * y1;
  y1 = 0;

  return [z1, z2];
}

function checkPrize(aX, aY, bX, bY, pX, pY) {
  // const dpX = delimeters(pX);
  // const dpY = delimeters(pY);
  const sol = [];

  const [cA, cB] = matrix(aX, aY, bX, bY, pX, pY);
  if (cA > 0 && cB > 0 && cA % 1 == 0 && cB % 1 == 0) {
    sol.push([cA, cB, costSol(cA, cB)]);
  }

  return sol;

  // let testSum = 0;
  // let cA = 0,
  //   cB = 0;
  // while (testSum < pX) {
  //   testSum = aX * cA;
  //   if ((pX - testSum) % bX == 0) {
  //     cB = (pX - testSum) / bX;

  //     if (cA * aY + cB * bY == pY) {
  //       sol.push([cA, cB, costSol(cA, cB)]);
  //     }
  //   }
  //   cA++;
  // }

  // return sol.sort((a, b) => a[2] - b[2])[0];
}

console.log(
  "A",
  map.reduce((sum, i) => (sum += (i[1] ?? [])[2] ?? 0), 0)
);

console.timeEnd("part A");
