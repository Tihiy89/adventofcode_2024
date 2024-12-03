import { input_a as input_a } from "./input.js";

let data = input_a()
  .split("\n")
  .map((i, ind) => [i.split(" ").map((i) => Number(i)), 0, ind]);

/* решение Б */
let safe = [];
let unsafe = [];
while (data.length) {
  // отчет
  const [report, recurse_level, ind] = data.pop();
  // собираем разницы
  const rep_d = [];
  for (let i = 1; i < report.length; i++) {
    rep_d.push(report[i] - report[i - 1]);
  }

  // определяем знак
  const sign = rep_d.reduce((s, i) => {
    if (Math.abs(s) > 1) {
      return s;
    }
    s += i > 0 ? 1 : 0;
    s += i < 0 ? -1 : 0;

    return s;
  }, 0);

  const bad_level = rep_d.reduce((bl, lev_d, ind) => {
    // проверка на один знак и на разницу
    if (lev_d * sign < 0 || Math.abs(lev_d) > 3 || lev_d == 0) {
      bl.push(ind);
    }
    return bl;
  }, []);

  if (bad_level.length == 0 && sign != 0) {
    data = data.filter((i) => i[2] != ind);

    if (recurse_level == 0) {
      safe.push([ind, report, rep_d, bad_level]);
    } else {
      safe.push([...unsafe.find((i) => i[0] == ind)]);
      unsafe = unsafe.filter((i) => i[0] != ind);
    }
  }

  if (recurse_level == 0 && bad_level.length) {
    unsafe.push([ind, report, rep_d, bad_level]);

    const bl_recheck = [...bad_level, bad_level[bad_level.length - 1] + 1];
    for (const el of bl_recheck) {
      const copy = [...report];
      copy.splice(el, 1);
      data.push([copy, recurse_level + 1, ind]);
    }
  }
}
console.log("B", safe.length);
