// import fs and lodash
const fs = require("fs");
const _ = require("lodash");

function readFile(name) {
  // read file and split into lines
  let input = fs.readFileSync(name, "utf8").split("\n");

  // each line is string, whitespace and number. split it into parts
  let inputArray = input.map((line) => line.split(" "));

  // return result
  return inputArray;
}

function part1() {
  // read file day02input
  let input = readFile("day02input");

  // initialize  position and depth
  let position = 0;
  let depth = 0;

  // loop over input
  for (let i = 0; i < input.length; i++) {
    // command is first element
    let command = input[i][0];

    // range is second element which is a number
    let range = parseInt(input[i][1]);

    // if command is forward add range to position. if command is up subtract range from depth, if down then add range to depth
    if (command === "forward") {
      position += range;
    } else if (command === "up") {
      depth -= range;
    } else if (command === "down") {
      depth += range;
    }
  }

  // multiply position and depth and output
  console.log(position * depth);
}

// function part2
function part2() {
  // read file day02input
  let input = readFile("day02input");

  // init position, depth and aim
  let position = 0;
  let aim = 0;
  let depth = 0;

  // loop over input
  for (let i = 0; i < input.length; i++) {
    // command is first element
    let command = input[i][0];

    // range is second element which is a number
    let range = parseInt(input[i][1]);

    // down X increases your aim by X units.
    // up X decreases your aim by X units.
    // forward X does two things:
    // It increases your horizontal position by X units.
    // It increases your depth by your aim multiplied by X.
    if (command === "down") {
      aim += range;
    } else if (command === "up") {
      aim -= range;
    } else if (command === "forward") {
      position += range;
      depth += aim * range;
    }
  }

  // multiply position and depth and output
  console.log(position * depth);
}

part2();
