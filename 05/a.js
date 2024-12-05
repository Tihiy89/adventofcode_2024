import { input_a as input_a } from "./input.js";

let [rules, updates] = input_a().split("\n\n");

rules = rules
  .split("\n")
  .map((i) => i.split("|").map(Number))
  .sort((a, b) => a[0] - b[0]);
updates = updates.split("\n").map((i) => i.split(",").map(Number));

function findBadElemRight(lItem, elemForCheck) {
  return elemForCheck.findIndex(
    (rItem) => rules.findIndex((r) => r[0] == rItem && r[1] == lItem) != -1
  );
}

function checkUpdate(update) {
  for (const i in update) {
    const ind_bad = findBadElemRight(update[i], update.slice(Number(i) + 1));
    if (ind_bad != -1) return false;
  }
  return true;
}

function checkAndRepairUpdate(update) {
  for (const i in update) {
    const ii = Number(i);
    let ind_bad = -1;
    do {
      const forCheck = update.slice(Number(ii) + 1);
      ind_bad = findBadElemRight(update[ii], forCheck);

      if (ind_bad != -1) {
        update = [
          ...update.slice(0, ii),
          forCheck[ind_bad],
          update[ii],
          ...forCheck.slice(0, ind_bad),
          ...forCheck.slice(ind_bad + 1),
        ];
      }
    } while (ind_bad != -1);
  }
  return update;
}

const bad_upd = [];
const sum_a = updates.reduce((sum, upd) => {
  const valid = checkUpdate(upd);

  sum += valid ? upd[Math.round(upd.length / 2) - 1] : 0;
  if (!valid) {
    bad_upd.push(upd);
  }

  return sum;
}, 0);

const sum_b = bad_upd.reduce((sum, upd, ind, m) => {
  const valid = checkAndRepairUpdate(m[ind]);

  sum += valid[Math.round(upd.length / 2) - 1];

  return sum;
}, 0);

console.log("A", sum_a);
console.log("B", sum_b);
