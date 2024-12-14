const fs = require("fs");

function antennaFinder(i, j, width = 0, length = 0) {
  const distance = [2 * Math.abs(i[0] - j[0]), 2 * Math.abs(i[1] - j[1])];
  let first = i[0];
  let second = i[1];
  const antenna = [];
  antenna.push([i[0], i[1]]);

  //part1
  if (width === 0) {
    if (i[0] - j[0] > 0) {
      first = i[0] - distance[0];
    } else if (i[0] - j[0] < 0) {
      first = i[0] + distance[0];
    }
    if (i[1] - j[1] > 0) {
      second = i[1] - distance[1];
    } else if (i[1] - j[1] < 0) {
      second = i[1] + distance[1];
    }
    antenna.push([first, second]);
    return antenna;
  }

  //part2
  while (first >= 0 && first < width && second >= 0 && second < length) {
    if (i[0] - j[0] > 0) {
      first -= distance[0];
    } else if (i[0] - j[0] < 0) {
      first += distance[0];
    }
    if (i[1] - j[1] > 0) {
      second -= distance[1];
    } else if (i[1] - j[1] < 0) {
      second += distance[1];
    }
    antenna.push([first, second]);
  }
  first = i[0];
  second = i[1];

  while (first >= 0 && first < width && second >= 0 && second < length) {
    if (i[0] - j[0] > 0) {
      first += distance[0];
    } else if (i[0] - j[0] < 0) {
      first -= distance[0];
    }
    if (i[1] - j[1] > 0) {
      second += distance[1];
    } else if (i[1] - j[1] < 0) {
      second -= distance[1];
    }
    antenna.push([first, second]);
  }
  return antenna;
}

function main() {
  fs.readFile("./givenFiles/day8.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const map = data
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    const frequencies = new Set();
    const width = map.length;
    const length = map[0].length;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < length; j++) {
        if (map[i][j] !== ".") {
          frequencies.add(map[i][j]);
        }
      }
    }

    const frequencyLocations = {};
    frequencies.forEach((frequency) => (frequencyLocations[frequency] = []));

    for (let row = 0; row < width; row++) {
      for (let col = 0; col < length; col++) {
        const char = map[row][col];
        if (frequencies.has(char)) {
          frequencyLocations[char].push([row, col]);
        }
      }
    }
    let trackMap = map.map((innerArray) => innerArray.slice());

    let antennasCount = 0;

    //part1
    // Object.keys(frequencyLocations).forEach((frequency) => {
    //   const locations = frequencyLocations[frequency];

    //   for (let i = 0; i < locations.length; i++) {
    //     for (let j = 0; j < locations.length; j++) {
    //       if (i !== j) {
    //         const antennaLocation = antennaFinder(locations[i], locations[j]);
    //         let antenna = antennaLocation[0];
    //         if (
    //           antenna[0] >= 0 &&
    //           antenna[0] < width &&
    //           antenna[1] >= 0 &&
    //           antenna[1] < length
    //         )
    //           if (trackMap[antenna[0]][antenna[1]] !== "#") {
    //             antennasCount++;
    //             trackMap[antenna[0]][antenna[1]] = "#";
    //           }
    //       }
    //     }
    //   }
    // });
    // console.log(antennasCount);

    //part2
    Object.keys(frequencyLocations).forEach((frequency) => {
      const locations = frequencyLocations[frequency];
      for (let i = 0; i < locations.length; i++) {
        for (let j = 0; j < locations.length; j++) {
          if (i !== j) {
            const antennaLocations = antennaFinder(
              locations[i],
              locations[j],
              width,
              length
            );

            for (let ant = 0; ant < antennaLocations.length; ant++) {
              const antennaLocation = antennaLocations[ant];
              if (
                antennaLocation[0] >= 0 &&
                antennaLocation[0] < width &&
                antennaLocation[1] >= 0 &&
                antennaLocation[1] < length
              ) {
                if (trackMap[antennaLocation[0]][antennaLocation[1]] !== "#") {
                  antennasCount++;
                  trackMap[antennaLocation[0]][antennaLocation[1]] = "#";
                }
              }
            }
          }
        }
      }
    });
    console.log(antennasCount);
  });
}

main();
