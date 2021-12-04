// import fs and lodash
const fs = require("fs");
const _ = require("lodash");

function readFile(name) {
  // read file and return array of numbers
  let input = fs.readFileSync(name, "utf8");
  input = input.split("\n");
  input = input.map(Number);
  return input;
}

function part1() {
  input = readFile("day01input");
  // loop over input and count the number of times a number is bigger than previous number in array
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      count++;
    }
  }

  // output count
  console.log(count);
}

function part2() {
  input = readFile("day01input");
  // loop over input
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    // create two sliding windows of length 3 one starting at index i and one starting at index i+1
    let window1 = input.slice(i, i + 3);
    let window2 = input.slice(i + 1, i + 4);

    // exit loop if window2 has less than 3 elements
    if (window2.length < 3) {
      break;
    }

    // create sums for both windows
    let sum1 = window1.reduce((a, b) => a + b);
    let sum2 = window2.reduce((a, b) => a + b);

    // increase count if sum2 is bigger than sum1
    if (sum2 > sum1) {
      count++;
    }
  }

  // output count
  console.log(count);
}

// run function part2
part2();
