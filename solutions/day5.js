const fs = require("fs");

function main() {
  fs.readFile("./givenFiles/day5.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const list = data.trim().split("\n");
    const rules = [];
    const prints = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].includes("|")) {
        const parts = list[i].split("|");
        const num1 = parseInt(parts[0], 10);
        const num2 = parseInt(parts[1], 10);
        rules.push([num1, num2]);
      } else if (list[i] !== "") {
        const parts = list[i].split(",").map((num) => parseInt(num, 10));
        prints.push(parts);
      }
    }

    //part1
    console.log(sumOfSafeMiddleValues(rules, prints));

    //part2
    console.log(fixCorruptPrints(rules, prints));
  });
}

function sumOfSafeMiddleValues(rules, prints) {
  let sum = 0;
  for (let i = 0; i < prints.length; i++) {
    let printIsSafe = true;
    const print = prints[i];
    for (let k = 0; k < print.length; k++) {
      for (let j = 0; j < rules.length; j++) {
        if (print[k] === rules[j][0]) {
          for (let m = 0; m < k; m++) {
            if (print[m] === rules[j][1]) {
              printIsSafe = false;
            }
          }
        }
      }
    }
    if (printIsSafe) {
      sum += print[(print.length - 1) / 2];
    }
  }
  return sum;
}

function fixCorruptPrints(rules, prints) {
  let sum = 0;
  for (let i = 0; i < prints.length; i++) {
    let printIsSafe = true;
    const print = prints[i];
    for (let k = 0; k < print.length; k++) {
      for (let j = 0; j < rules.length; j++) {
        if (print[k] === rules[j][0]) {
          for (let m = 0; m < k; m++) {
            if (print[m] === rules[j][1]) {
              printIsSafe = false;
              let temp = print[m];
              print[m] = print[k];
              print[k] = temp;
              k = 0;
            }
          }
        }
      }
    }
    if (!printIsSafe) {
      sum += print[(print.length - 1) / 2];
    }
  }
  return sum;
}

main();
