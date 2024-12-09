import { input_a as input_a } from "./input.js";
console.time("part B");

const inputStr = input_a();

let map = inputStr
  .split("")
  .map(Number)
  .reduce((m, i, ind) => {
    let val = ".";
    if (ind % 2 == 0) {
      val = ind / 2;
    }

    m.push([val, i]);
    return m;
  }, []);

for (let i = map.length - 1; i >= 0; i--) {
  if (i % 100 == 0) {
    console.log(`calc ${i} / ${map.length - 1}`);
  }
  if (map[i][0] != ".") {
    for (let j = 0; j < i; j++) {
      if (map[j][0] == "." && map[j][1] >= map[i][1]) {
        let new_elem = false;

        if (map[j][1] > map[i][1]) {
          new_elem = true;
        }

        // перемещаем
        map = [
          // до найденного диапазона
          ...map.slice(0, j),
          // замена в совбодном диапазоне
          ...map.slice(i, i + 1),
          // пустой блок если надо
          ...(new_elem ? [[".", map[j][1] - map[i][1]]] : []),
          // от j до i
          ...map.slice(j + 1, i),
          // на место извлеченного элемента
          [".", map[i][1]],
          // конец если был
          ...map.slice(i + 1),
        ];

        // выходим
        j = i;
      }
    }
  }
}

const map_b = map.reduce((m, i) => {
  m.push(...Array(i[1]).fill(i[0]));
  return m;
}, []);

const sum_b = map_b.reduce((sum, item, ind) => {
  if (item != ".") {
    sum += item * ind;
  }
  return sum;
}, 0);

console.log("B", sum_b);
console.timeEnd("part B");
