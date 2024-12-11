import { input_a as input_a } from "./input.js";
console.time("part A");

const COUNT_STEP = 75;

let input = input_a().split(" ").map(Number);

const cache = Array(COUNT_STEP);

function findCache(lev, inp) {
  const l = cache[lev] ?? [];

  return l[inp];
}
function saveCache(lev, inp, sum) {
  cache[lev] = cache[lev] ?? [];
  cache[lev][inp] = sum;
}

const res_arr = [];

function blink(inp, lev) {
  if (lev == COUNT_STEP) {
    res_arr.push(inp);
    return 1;
  }

  // кэш;
  const cc = findCache(lev, inp);
  if (cc != undefined) {
    // console.log("cache", lev, inp, cc);
    return cc;
  }

  let sum = 0;
  if (inp == 0) {
    sum += blink(1, lev + 1);
  } else if (("" + inp).length % 2 == 0) {
    const num = "" + inp;

    sum += blink(Number(num.slice(0, num.length / 2)), lev + 1);
    sum += blink(Number(num.slice(num.length / 2)), lev + 1);
  } else {
    sum += blink(inp * 2024, lev + 1);
  }

  saveCache(lev, inp, sum);
  return sum;
}

const sum = input.reduce((sum, i) => {
  sum += blink(i, 0);
  return sum;
}, 0);

// console.log(res_arr);
console.log("A", sum);

console.timeEnd("part A");
