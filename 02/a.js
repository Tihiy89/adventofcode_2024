import { input_a as input_a } from "./input.js";

let data = input_a()
  .split("\n")
  .map((i) => i.split(" ").map((i) => Number(i)));

// собираем массив разностей
const data_d = data.map((report) => {
  const rep_upd = [];
  for (let i = 1; i < report.length; i++) {
    rep_upd.push(report[i] - report[i - 1]);
  }
  return rep_upd;
});

// решение А
const safety_report = data_d.reduce((sum, report) => {
  sum +=
    report.findIndex((lev_d) => {
      // проверка на один знак и на разницу
      return lev_d * report[0] < 0 || Math.abs(lev_d) > 3 || lev_d == 0;
    }) == -1
      ? 1
      : 0;

  return sum;
}, 0);

/* решение Б */
const safe = [];
const unsafe = [];
const safety_report_b = data_d.reduce((sum, report, ind) => {
  const bad_level = report.reduce((bl, lev_d, ind) => {
    // проверка на один знак и на разницу
    if (lev_d * report[0] < 0 || Math.abs(lev_d) > 3 || lev_d == 0)
      bl.push(ind);

    return bl;
  }, []);

  if (bad_level.length == 0) {
    safe.push([data[ind], data_d[ind]]);
    return ++sum;
  }

  const report_fix = [...report];
  const last = bad_level[0] == report.length;
  report_fix.splice(
    bad_level[0] - 1,
    2,
    report[bad_level[0] - 1] + (last ? report[bad_level[0]] : 0)
  );

  const s =
    report_fix.findIndex((lev_d) => {
      /* проверка на один знак и на разницу*/
      return lev_d * report_fix[0] < 0 || Math.abs(lev_d) > 3 || lev_d == 0;
    }) == -1
      ? 1
      : 0;

  if (s) {
    safe.push([data[ind], data_d[ind]]);
  } else {
    unsafe.push([data[ind], data_d[ind]]);
  }

  sum += s ? 1 : 0;
  return sum;
}, 0);

console.log("A", safety_report);
console.log("B", safety_report_b);
