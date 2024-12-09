const fs = require("fs");

function main() {
  fs.readFile("./givenFiles/day1.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const lines = data.trim().split("\n");
    const leftList = lines.map((line) => Number(line.split(/\s+/)[0]));
    const rightList = lines.map((line) => Number(line.split(/\s+/)[1]));
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    //part 1
    const distance = calculateDistance(leftList, rightList, 0);
    //part 2
    const similaritiy = calculateSimilaritiy(leftList, rightList, 0);
  });
}

function calculateDistance(leftList, rightList, value) {
  for (let i = 0; i < leftList.length; i++) {
    value += Math.abs(leftList[i] - rightList[i]);
  }
  return value;
}

function calculateSimilaritiy(leftList, rightList, value) {
  for (let i = 0; i < leftList.length; i++) {
    value +=
      leftList[i] * rightList.filter((item) => item === leftList[i]).length;
  }
  return value;
}

main();
