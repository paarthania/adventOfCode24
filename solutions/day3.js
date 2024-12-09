const fs = require("fs");

function main() {
  fs.readFile("./givenFiles/day3.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    //part 1
    const regexGeneral = /mul\(\d+,\d+\)/g;
    const matches = data.match(regexGeneral);

    let result = 0;

    for (let i = 0; i < matches.length; i++) {
      result += calculateSumOfMuls(matches[i]);
    }

    //part 2
    const regexPart2 = /mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g;
    const matches2 = data.match(regexPart2);
    let result2 = 0;
    let isEnabled = true;
    for (let i = 0; i < matches2.length; i++) {
      if (matches2[i] === "don't()") {
        isEnabled = false;
      } else if (matches2[i] === "do()") {
        isEnabled = true;
      } else {
        if (isEnabled) {
          result2 += calculateSumOfMuls(matches2[i]);
        }
      }
    }
    console.log(result2);
  });
}

function calculateSumOfMuls(matched) {
  const regexInternal = /\d+/g;
  const nums = matched.match(regexInternal).map(Number);
  return nums[0] * nums[1];
}

main();
