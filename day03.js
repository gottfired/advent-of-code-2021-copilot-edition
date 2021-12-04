// import fs
const fs = require("fs");

// function to read file and split it into array
function readFile(fileName) {
  return fs.readFileSync(fileName, "utf8").split("\n");
}

function part1() {
  // read file day03input
  const input = readFile("day03input");

  // len is the length of the first input element
  const len = input[0].length;

  // init commonBit as array of len
  let commonBit = new Array(len).fill(0);

  // loop through input and split each element into array
  // then loop through each element if 1 then increase commonBit at that index by 1 if 0 then decrease by 1
  for (let i = 0; i < input.length; i++) {
    const bit = input[i].split("");
    for (let j = 0; j < len; j++) {
      if (bit[j] == 1) {
        commonBit[j]++;
      } else {
        commonBit[j]--;
      }
    }
  }

  // copy commonBit to common and inverted
  let common = commonBit.slice();
  let inverted = commonBit.slice();

  // loop over common and inverted
  // if entry > 0 then set common[j] to 1 else 0
  // inverted is the same as common but with 1 and 0 switched
  for (let i = 0; i < common.length; i++) {
    if (common[i] > 0) {
      common[i] = 1;
    } else {
      common[i] = 0;
    }
    if (inverted[i] > 0) {
      inverted[i] = 0;
    } else {
      inverted[i] = 1;
    }
  }

  // common and inverted are binary number strings, convert them to decimal
  const commonDecimal = parseInt(common.join(""), 2);
  const invertedDecimal = parseInt(inverted.join(""), 2);

  // multiply them and print
  const answer = commonDecimal * invertedDecimal;
  console.log(answer);
}

function commonBit(bitStrings, i) {
  // iterate over bitStrings and count number of 1s
  let count = 0;
  for (let j = 0; j < bitStrings.length; j++) {
    if (bitStrings[j][i] == 1) {
      count++;
    }
  }

  // return 1 if more 1 than 0, 0 if more 0 than 1, -1 if equal
  if (count > bitStrings.length / 2) {
    return 1;
  }
  if (count < bitStrings.length / 2) {
    return 0;
  }
  return -1;
}

function part2() {
  // read file day03input
  let input = readFile("day03input");

  // len is the length of the first input element
  const len = input[0].length;

  // deep copy input to co2input
  let co2input = input.slice();

  // iterate over len
  // if commonBit of input at i is 1 then filter input by all elements with bit at i as 1
  // if commonBit of input at i is 0 then filter input by all elements with bit at i as 0
  // if commonBit of input at i is -1 then filter input by all elements with bit at i as 1
  for (let i = 0; i < len; i++) {
    if (commonBit(input, i) == 1) {
      input = input.filter((element) => element[i] == 1);
    } else if (commonBit(input, i) == 0) {
      input = input.filter((element) => element[i] == 0);
    } else {
      input = input.filter((element) => element[i] == 1);
    }

    // stop if input contains only one element
    if (input.length == 1) {
      break;
    }
  }

  // do the same for co2input but inverted
  for (let i = 0; i < len; i++) {
    if (commonBit(co2input, i) == 1) {
      co2input = co2input.filter((element) => element[i] == 0);
    } else if (commonBit(co2input, i) == 0) {
      co2input = co2input.filter((element) => element[i] == 1);
    } else {
      co2input = co2input.filter((element) => element[i] == 0);
    }

    // stop if co2input contains only one element
    if (co2input.length == 1) {
      break;
    }
  }

  // the first elements of input and co2input are strings
  // convert them to decimal and multiply them, print answer
  const answer = parseInt(input[0], 2) * parseInt(co2input[0], 2);
  console.log(answer);
}

part2();
