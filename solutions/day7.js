const fs = require("fs");

function main() {
  fs.readFile("./givenFiles/day7.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const list = data.trim().split("\n");
    const results = [];
    const inputs = [];
    for (let i = 0; i < list.length; i++) {
      const parts = list[i].split(":");
      results.push(parseInt(parts[0], 10));
      inputs.push(parts[1].trim().split(" ").map(Number));
    }
    console.log(possibleEquationSum(results, inputs));
  });
}

function possibleEquationSum(results, inputs) {
  let sum = 0;
  const equationCount = results.length;
  for (let i = 0; i < equationCount; i++) {
    if (canAchieveTargetWithConcatenation(inputs[i], results[i])) {
      sum += results[i];
    }
  }
  return sum;
}

//part1
function canAchieveTarget(nums, target) {
  function helper(index, currentTotal) {
    if (index === nums.length) {
      return currentTotal === target;
    }

    const currentNum = nums[index];

    return (
      helper(index + 1, currentTotal + currentNum) ||
      helper(index + 1, currentTotal * currentNum)
    );
  }
  return helper(1, nums[0]);
}

//part2
function canAchieveTargetWithConcatenation(nums, target) {
  function helper(index, currentTotal) {
    if (index === nums.length) {
      return currentTotal === target;
    }

    const currentNum = nums[index];

    return (
      helper(index + 1, currentTotal + currentNum) ||
      helper(index + 1, currentTotal * currentNum) ||
      helper(index + 1, parseInt(`${currentTotal}${currentNum}`, 10))
    );
  }
  return helper(1, nums[0]);
}

main();
