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

    const distance = calculateDistance(leftList, rightList, 0);
    console.log(distance);
  });
}

function calculateDistance(leftList, rightList, startingPoint) {
  for (let i = 0; i < leftList.length; i++) {
    startingPoint += Math.abs(leftList[i] - rightList[i]);
  }

  return startingPoint;
}

main();
