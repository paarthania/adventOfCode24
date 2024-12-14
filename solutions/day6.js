const fs = require("fs");

function changeDirection(direction) {
  if (direction === "up") {
    return "right";
  } else if (direction === "right") {
    return "down";
  } else if (direction === "down") {
    return "left";
  } else if (direction === "left") {
    return "up";
  }
}

function main() {
  fs.readFile("./givenFiles/day6.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const map = data
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    let guardLocation = null;

    for (let i = 0; i < map.length; i++) {
      const innerIndex = map[i].indexOf("^");
      if (innerIndex !== -1) {
        guardLocation = [i, innerIndex];
        break;
      }
    }
    let trackMap = map.map((innerArray) => innerArray.slice());
    trackMap[guardLocation[0]][guardLocation[1]] = "X";

    trackMap = moveGuard(guardLocation[0], guardLocation[1], map, trackMap);
    let countX = 0;
    //part 1
    for (let i = 0; i < trackMap.length; i++) {
      for (let j = 0; j < trackMap[i].length; j++) {
        if (trackMap[i][j] === "X") {
          countX++;
        }
      }
    }
    let possibleObsCount = 0;
    console.log(countX);

    //part 2
    for (let i = 0; i < trackMap.length; i++) {
      for (let j = 0; j < trackMap[i].length; j++) {
        if (trackMap[i][j] === "X") {
          let obstacleTrial = map.map((innerArray) => innerArray.slice());
          obstacleTrial[i][j] = "#";
          if (
            possibleObstacle(
              guardLocation[0],
              guardLocation[1],
              obstacleTrial,
              obstacleTrial
            )
          ) {
            possibleObsCount++;
          }
        }
      }
    }
    console.log(possibleObsCount);
  });
}

//part 1
function moveGuard(i, j, map, trackMap) {
  const width = map.length;
  const length = map[0].length;
  let moveCount = 0;
  let direction = "up";
  const guardLocation = [i, j];

  while (
    guardLocation[0] > 0 &&
    guardLocation[0] < width &&
    guardLocation[1] > 0 &&
    guardLocation[1] < length
  ) {
    if (direction === "up") {
      let nextLocation = [guardLocation[0] - 1, guardLocation[1]];
      if (nextLocation[0] < 0) {
        break;
      }
      if (
        map[nextLocation[0]][nextLocation[1]] === "." ||
        map[nextLocation[0]][nextLocation[1]] === "^"
      ) {
        guardLocation[0]--;
        trackMap[nextLocation[0]][nextLocation[1]] = "X";
        moveCount++;
      } else {
        direction = changeDirection(direction);
      }
    } else if (direction === "right") {
      let nextLocation = [guardLocation[0], guardLocation[1] + 1];
      if (nextLocation[1] >= width) {
        break;
      }
      if (
        map[nextLocation[0]][nextLocation[1]] === "." ||
        map[nextLocation[0]][nextLocation[1]] === "^"
      ) {
        guardLocation[1]++;
        trackMap[nextLocation[0]][nextLocation[1]] = "X";
        moveCount++;
      } else {
        direction = changeDirection(direction);
      }
    } else if (direction === "down") {
      let nextLocation = [guardLocation[0] + 1, guardLocation[1]];
      if (nextLocation[0] >= length) {
        break;
      }
      if (
        map[nextLocation[0]][nextLocation[1]] === "." ||
        map[nextLocation[0]][nextLocation[1]] === "^"
      ) {
        guardLocation[0]++;
        trackMap[nextLocation[0]][nextLocation[1]] = "X";
        moveCount++;
      } else {
        direction = changeDirection(direction);
      }
    } else if (direction === "left") {
      let nextLocation = [guardLocation[0], guardLocation[1] - 1];
      if (nextLocation[1] < 0) {
        break;
      }
      if (
        map[nextLocation[0]][nextLocation[1]] === "." ||
        map[nextLocation[0]][nextLocation[1]] === "^"
      ) {
        guardLocation[1]--;
        trackMap[nextLocation[0]][nextLocation[1]] = "X";
        moveCount++;
      } else {
        direction = changeDirection(direction);
      }
    }
  }
  return trackMap;
}

//part 2

function possibleObstacle(i, j, map, trackMap) {
  const width = map.length;
  const length = map[0].length;
  let direction = "up";
  const guardLocation = [i, j];
  while (
    guardLocation[0] > 0 &&
    guardLocation[0] < width &&
    guardLocation[1] > 0 &&
    guardLocation[1] < length
  ) {
    if (direction === "up") {
      let nextLocation = [guardLocation[0] - 1, guardLocation[1]];
      if (nextLocation[0] < 0) {
        break;
      }
      if (map[nextLocation[0]][nextLocation[1]] !== "#") {
        guardLocation[0]--;
        if (trackMap[nextLocation[0]][nextLocation[1]] === "U") {
          return true;
        }
        trackMap[nextLocation[0]][nextLocation[1]] = "U";
      } else {
        direction = changeDirection(direction);
      }
    } else if (direction === "right") {
      let nextLocation = [guardLocation[0], guardLocation[1] + 1];
      if (nextLocation[1] >= width) {
        break;
      }
      if (map[nextLocation[0]][nextLocation[1]] !== "#") {
        guardLocation[1]++;
        if (trackMap[nextLocation[0]][nextLocation[1]] === "R") {
          return true;
        }
        trackMap[nextLocation[0]][nextLocation[1]] = "R";
      } else {
        direction = changeDirection(direction);
      }
    } else if (direction === "down") {
      let nextLocation = [guardLocation[0] + 1, guardLocation[1]];
      if (nextLocation[0] >= length) {
        break;
      }
      if (map[nextLocation[0]][nextLocation[1]] !== "#") {
        guardLocation[0]++;
        if (trackMap[nextLocation[0]][nextLocation[1]] === "D") {
          return true;
        }
        trackMap[nextLocation[0]][nextLocation[1]] = "D";
      } else {
        direction = changeDirection(direction);
      }
    } else if (direction === "left") {
      let nextLocation = [guardLocation[0], guardLocation[1] - 1];
      if (nextLocation[1] < 0) {
        break;
      }
      if (map[nextLocation[0]][nextLocation[1]] !== "#") {
        guardLocation[1]--;
        if (trackMap[nextLocation[0]][nextLocation[1]] === "L") {
          return true;
        }
        trackMap[nextLocation[0]][nextLocation[1]] = "L";
      } else {
        direction = changeDirection(direction);
      }
    }
  }
  return false;
}

main();
