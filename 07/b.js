import { input_a as input_a } from "./input.js";

const eqs = input_a()
  .split("\n")
  .map((eq) => {
    let [testVal, operators] = eq.split(":");
    testVal = Number(testVal);
    operators = operators.trim().split(" ").map(Number);
    return [testVal, operators];
  });

const verifyed = eqs.map((eq) => {
  let [testVal, operators] = eq;
  const res = operators.reduce((variants, op) => {
    if (variants.length == 0) {
      variants.push(op);
    } else {
      variants = [
        ...variants.map((v) => v * op),
        ...variants.map((v) => v + op),
        // Часть Б
        ...variants.map((v) => Number("" + v + op)),
      ].filter((v) => v <= testVal);
    }
    return variants;
  }, []);
  return res.filter((v) => v == testVal).length != 0 ? testVal : 0;
});

const a = verifyed.reduce((s, i) => s + i, 0);

console.log("A", a);
