const fs = require("fs");

function main() {
  fs.readFile("./givenFiles/day2.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const arrayOfArrays = data
      .trim()
      .split("\n")
      .map((line) => line.split(/\s+/).map(Number));

    let safeArrayCount = 0;
    for (let i = 0; i < arrayOfArrays.length; i++) {
      safeArrayCount += isArraySafe(arrayOfArrays[i]);
    }

    let safeArrayCountWithErrorTolerance = 0;
    for (let i = 0; i < arrayOfArrays.length; i++) {
      safeArrayCountWithErrorTolerance += isArraySafeWithErrorTolerance(
        arrayOfArrays[i]
      );
    }

    console.log(safeArrayCountWithErrorTolerance);
  });
}

//part 1
function isArraySafe(arr) {
  const isDecreasing = arr[0] > arr[1];

  for (let i = 0; i < arr.length - 1; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) > 3) return 0;
    if (
      (isDecreasing && arr[i] <= arr[i + 1]) ||
      (!isDecreasing && arr[i] >= arr[i + 1])
    ) {
      return 0;
    }
  }

  return 1;
}

//part 2
function isArraySafeWithErrorTolerance(arr) {
  var increasing = 0;
  var decreasing = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) {
      increasing++;
    } else if (arr[i] > arr[i + 1]) {
      decreasing++;
    }
  }
  const isDecreasing = decreasing > increasing;
  for (let i = 0; i < arr.length - 1; i++) {
    if (
      (isDecreasing && arr[i] <= arr[i + 1]) ||
      (!isDecreasing && arr[i] >= arr[i + 1]) ||
      Math.abs(arr[i] - arr[i + 1]) > 3
    ) {
      const option1 = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const option2 = [...arr.slice(0, i + 1), ...arr.slice(i + 2)];

      for (let j = 0; j < option1.length - 1; j++) {
        if (
          (isDecreasing && option1[j] <= option1[j + 1]) ||
          (!isDecreasing && option1[j] >= option1[j + 1]) ||
          Math.abs(option1[j] - option1[j + 1]) > 3
        ) {
          for (let k = 0; k < option2.length - 1; k++) {
            if (
              (isDecreasing && option2[k] <= option2[k + 1]) ||
              (!isDecreasing && option2[k] >= option2[k + 1]) ||
              Math.abs(option2[k] - option2[k + 1]) > 3
            ) {
              return 0;
            }
          }
          return 1;
        }
      }
      return 1;
    }
  }

  return 1;
}

main();
