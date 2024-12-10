const fs = require("fs");

function main() {
  fs.readFile("./givenFiles/day4.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const arrayOfArrays = data
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    //part1
    console.log(countOccurrences(arrayOfArrays, "XMAS"));

    //part2
    console.log(findXmases(arrayOfArrays, "MAS"));
  });
}

function countOccurrences(matrix, word) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const wordLength = word.length;
  const reverseWord = word.split("").reverse().join("");
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - wordLength; col++) {
      const substring = matrix[row].slice(col, col + wordLength).join("");
      if (substring === word || substring === reverseWord) {
        count++;
      }
    }
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row <= rows - wordLength; row++) {
      let substring = "";
      for (let k = 0; k < wordLength; k++) {
        substring += matrix[row + k][col];
      }

      if (substring === word || substring === reverseWord) {
        count++;
      }
    }
  }
  //while at that point check both diagonal directions
  for (let row = 0; row <= rows - wordLength; row++) {
    for (let col = 0; col < cols; col++) {
      if (col <= cols - wordLength) {
        let diagonal1 = "";
        for (let k = 0; k < wordLength; k++) {
          diagonal1 += matrix[row + k][col + k];
        }
        if (diagonal1 === word || diagonal1 === reverseWord) count++;
      }
      if (col >= wordLength - 1) {
        let diagonal2 = "";
        for (let k = 0; k < wordLength; k++) {
          diagonal2 += matrix[row + k][col - k];
        }
        if (diagonal2 === word || diagonal2 === reverseWord) count++;
      }
    }
  }

  return count;
}

function findXmases(matrix, word) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const wordLength = word.length;
  const reverseWord = word.split("").reverse().join("");
  let count = 0;

  for (let row = 0; row <= rows - wordLength; row++) {
    for (let col = 0; col < cols; col++) {
      if (col <= cols - wordLength) {
        let diagonal1 = "";
        for (let k = 0; k < wordLength; k++) {
          diagonal1 += matrix[row + k][col + k];
        }
        if (diagonal1 === word || diagonal1 === reverseWord) {
          if (
            (matrix[row][col + 2] === "S" && matrix[row + 2][col] === "M") ||
            (matrix[row][col + 2] === "M" && matrix[row + 2][col] === "S")
          )
            count++;
        }
      }
    }
  }

  return count;
}

main();
