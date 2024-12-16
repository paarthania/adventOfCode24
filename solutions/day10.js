const fs = require("fs");

function main() {
  fs.readFile("./givenFiles/day10.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const map = data
      .trim()
      .split("\n")
      .map((line) => line.split("").map(Number));

    const paths = findAllPathsFromZeros(map);

    //part1
    const uniquePaths = new Set();
    paths.forEach((path) => {
      const startPoint = path[0].join(",");
      const endPoint = path[path.length - 1].join(",");
      uniquePaths.add(`${startPoint} - ${endPoint}`);
    });

    const count = uniquePaths.size;
    console.log(count);

    //part2
    console.log(paths.length);
  });
}

function isValid(x, y, visited, map) {
  return (
    x >= 0 &&
    x < map.length &&
    y >= 0 &&
    y < map[0].length &&
    !visited.has(`${x},${y}`)
  );
}

function findPaths(x, y, visited, currentPath, allPaths, map) {
  if (!isValid(x, y, visited, map)) {
    return;
  }
  const currentValue = map[x][y];

  if (currentValue === 9) {
    allPaths.push([...currentPath, [x, y]]);
    return;
  }

  visited.add(`${x},${y}`);
  currentPath.push([x, y]);

  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  const validNeighbors = [];
  for (const [i, j] of directions) {
    const newX = x + i;
    const newY = y + j;

    if (
      isValid(newX, newY, visited, map) &&
      map[newX][newY] === currentValue + 1
    ) {
      validNeighbors.push([newX, newY]);
    }
  }

  if (validNeighbors.length === 0) {
    visited.delete(`${x},${y}`);
    currentPath.pop();
    return;
  }
  for (const [newX, newY] of validNeighbors) {
    findPaths(newX, newY, visited, currentPath, allPaths, map);
  }

  visited.delete(`${x},${y}`);
  currentPath.pop();
}

function findAllPathsFromZeros(map) {
  const allPaths = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 0) {
        const visited = new Set();
        findPaths(i, j, visited, [], allPaths, map);
      }
    }
  }
  return allPaths;
}

main();
