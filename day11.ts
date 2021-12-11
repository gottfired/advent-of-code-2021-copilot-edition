// import fs and lodash
import * as _ from "lodash";
import * as fs from "fs";

// function reads file into 2d array of single digits
function readFile(fileName: string): number[][] {
  const file = fs.readFileSync(fileName, "utf8");
  const lines = file.split("\n");
  const digits = lines.map((line) =>
    line.split("").map((digit) => parseInt(digit, 10))
  );
  return digits;
}

// function increase takes 2d array of single digits and returns 2d array of single digits
// increases each digit by 1
function increase(digits: number[][]): number[][] {
  return digits.map((row) => row.map((digit) => digit + 1));
}

// create data structure for 2d vector
interface Vector2 {
  x: number;
  y: number;
}

// create data structure holding 2d bool array flashed and array of 2d vectors toBeFlashed
interface FlashData {
  flashed: boolean[][];
  toBeFlashed: Vector2[];
}

// function flash takes 2d array of numbers, the 2d coordinates of a number, and a 2d array of boolean values named flashed, and 2d array of vectors toBeFlashed
// if digit is > 9 and not flashed, mark it as flashed and
// flash it by increasing it by increasing every neighbor with value smaller than 10 (also diagonal) by 1.
// if any of those neighbors reaches 10, store their coordinate in an array toBeFlashed.
// return flashed and toBeFlashed as FlashData
function flash(
  digits: number[][],
  coords: Vector2,
  flashed: boolean[][],
  toBeFlashed: Vector2[] = []
): FlashData {
  const digit = digits[coords.y][coords.x];
  if (digit > 9 && !flashed[coords.y][coords.x]) {
    flashed[coords.y][coords.x] = true;
    const neighbors: Vector2[] = [
      { x: coords.x - 1, y: coords.y - 1 },
      { x: coords.x, y: coords.y - 1 },
      { x: coords.x + 1, y: coords.y - 1 },
      { x: coords.x - 1, y: coords.y },
      { x: coords.x + 1, y: coords.y },
      { x: coords.x - 1, y: coords.y + 1 },
      { x: coords.x, y: coords.y + 1 },
      { x: coords.x + 1, y: coords.y + 1 },
    ];
    neighbors.forEach((neighbor) => {
      if (
        neighbor.x >= 0 &&
        neighbor.x < digits[0].length &&
        neighbor.y >= 0 &&
        neighbor.y < digits.length &&
        digits[neighbor.y][neighbor.x] <= 9
      ) {
        // increase neighbor by 1
        digits[neighbor.y][neighbor.x]++;
        if (digits[neighbor.y][neighbor.x] === 10) {
          toBeFlashed.push(neighbor);
        }
      }
    });
  }
  return { flashed, toBeFlashed };
}

// function flashAll takes 2d array of single digits and returns 2d array of single digits
// iterates through each digit and flashes it and not already flashed
// afterward reset all > 9 digits to 0
// return number of flashed digits
function flashAll(digits: number[][]): number {
  // create 2d array flashed of boolean values without lodash
  let flashed: boolean[][] = [];
  for (let i = 0; i < digits.length; i++) {
    let row: boolean[] = [];
    for (let j = 0; j < digits[0].length; j++) {
      row.push(false);
    }
    flashed.push(row);
  }

  // init toBeFlashed with coords of all digits > 9
  let toBeFlashed: Vector2[] = [];
  // init toBeFlashed with coords of all digits > 9
  digits.forEach((row, y) => {
    row.forEach((digit, x) => {
      if (digit > 9 && !flashed[y][x]) {
        toBeFlashed.push({ x, y });
      }
    });
  });

  // repeat until toBeFlashed is empty
  while (toBeFlashed.length > 0) {
    // deep copy toBeFlashed to temp
    const temp = [...toBeFlashed];

    for (let y = 0; y < digits.length; y++) {
      for (let x = 0; x < digits[0].length; x++) {
        const coords = { x, y };
        const res = flash(digits, coords, flashed, toBeFlashed);
        flashed = res.flashed;
        toBeFlashed = res.toBeFlashed;
      }
    }

    // remove temp from toBeFlashed
    toBeFlashed = toBeFlashed.filter((coord) => !temp.includes(coord));
  }

  // reset all digits >= 9 to 0
  digits.forEach((row, y) => {
    row.forEach((digit, x) => {
      if (digit > 9) {
        digits[y][x] = 0;
      }
    });
  });

  // count number of flashed digits
  return _.flatten(flashed).filter((flashed) => flashed).length;
}

function part1() {
  // read "day11sample", use let, not const
  let digits = readFile("day11input");

  // repeat 100 times, increase, count number of flashed digits, sum up total number of flashed digits
  let total = 0;
  for (let i = 0; i < 1000000; i++) {
    digits = increase(digits);
    total += flashAll(digits);
    // if all digits are 0 print "found it" and i+1, then break
    if (digits.every((row) => row.every((digit) => digit === 0))) {
      console.log("found it", i + 1);
      break;
    }
  }
  console.log(total);

  // pretty print digits as 2d array
  console.log(digits.map((row) => row.join("")).join("\n"));
}

part1();
