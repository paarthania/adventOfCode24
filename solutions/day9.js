const fs = require("fs");

function main() {
  fs.readFile("./givenFiles/day9.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const charArray = data.split("");
    const ids = {};
    let id = 0;
    let currentIndex = 0;
    for (i = 0; i < charArray.length; i += 2) {
      ids[id] = {
        count: Number(charArray[i]),
        startIndex: currentIndex,
        order: i,
      };
      id++;
      if (i + 1 < charArray.length) {
        currentIndex += Number(charArray[i]) + Number(charArray[i + 1]);
      }
    }
    //console.log(ids);
    const diskView = [];
    for (i = 0; i < charArray.length; i++) {
      if (i % 2 === 0) {
        const [key, file] = Object.entries(ids).find(
          ([key, file]) => file.order === i
        );
        for (let j = 0; j < file.count; j++) {
          diskView.push(Number(key));
        }
      } else {
        for (let j = 0; j < Number(charArray[i]); j++) {
          diskView.push(".");
        }
      }
    }
    //part1
    //moveFilesToLeft(diskView);
    //part2
    moveBulksToLeft(diskView, ids);
  });
}

//take part2 answer as example solution to this kind of question

//part 1
function moveFilesToLeft(diskView) {
  for (let j = 0; j < diskView.length; j++) {
    let hasNum = false;
    for (let k = j; k < diskView.length; k++) {
      if (diskView[k] !== ".") {
        hasNum = true;
      }
    }
    if (!hasNum) {
      break;
    }
    if (diskView[j] === ".") {
      for (let i = diskView.length - 1; i >= 0; i--) {
        if (diskView[i] !== ".") {
          let temp = diskView[j];
          diskView[j] = diskView[i];
          diskView[i] = temp;
          break;
        }
      }
    }
  }
  let checksum = 0;
  for (let j = 0; j < diskView.length; j++) {
    if (diskView[j] !== ".") {
      checksum += diskView[j] * j;
    }
  }
  console.log(checksum);
}

function moveBulksToLeft(diskView, ids) {
  console.log(diskView.join(""));

  //descending order
  const fileIDs = Object.keys(ids)
    .map(Number)
    .sort((a, b) => b - a);

  for (const fileID of fileIDs) {
    const fileSize = ids[fileID].count;

    let targetIndex = -1;
    for (let i = 0; i <= diskView.length - fileSize; i++) {
      if (diskView.slice(i, i + fileSize).every((block) => block === ".")) {
        targetIndex = i;
        break;
      }
    }

    // console.log(`id is: ${fileID}`);
    // console.log(`index of file ID is: ${ids[fileID].startIndex}`);
    // console.log(`target index is: ${targetIndex}`);

    if (targetIndex !== -1 && targetIndex < ids[fileID].startIndex) {
      for (let i = 0; i < diskView.length; i++) {
        if (diskView[i] === fileID) {
          diskView[i] = ".";
        }
      }
      for (let i = 0; i < fileSize; i++) {
        diskView[targetIndex + i] = fileID;
      }
    }
  }

  let checksum = 0;
  for (let j = 0; j < diskView.length; j++) {
    if (diskView[j] !== ".") {
      checksum += diskView[j] * j;
    }
  }
  //console.log(diskView.join(""));
  console.log(checksum);
}

main();
