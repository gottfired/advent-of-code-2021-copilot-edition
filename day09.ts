// import fs and lodash
import * as _ from "lodash";
import * as fs from "fs";

// function reads file which is a 2d array of single digit numbers
// returns a 2d array of single digit numbers
function readFile(fileName: string): number[][] {
  const input = fs.readFileSync(fileName, "utf8");
  const lines = input.split("\n");
  const numbers = lines.map((line) =>
    line.split("").map((char) => parseInt(char))
  );
  return numbers;
}

// algorithm to find list of local minima in numbers
// local minima if smaller than left, right, top and bottom neighbours
// returns a list of local minima and their coordinates
function findLocalMinima(numbers: number[][]) {
  const localMinima: number[] = [];
  const localMinimaCoordinates: number[][] = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers[i].length; j++) {
      if (
        (i === 0 || numbers[i][j] < numbers[i - 1][j]) &&
        (j === 0 || numbers[i][j] < numbers[i][j - 1]) &&
        (i === numbers.length - 1 || numbers[i][j] < numbers[i + 1][j]) &&
        (j === numbers[i].length - 1 || numbers[i][j] < numbers[i][j + 1])
      ) {
        localMinima.push(numbers[i][j]);
        localMinimaCoordinates.push([i, j]);
      }
    }
  }

  return {
    localMinima,
    localMinimaCoordinates,
  };
}

// function with height map input of single digit numbers as array, second parameter is the x and y coordinate of the starting point
// flood fill outwards from starting point until digit 9 is reached
// return the size of the filled area
function floodFill(numbers: number[][], x: number, y: number): number {
  let size = 0;
  if (numbers[x][y] === 9) {
    return 1;
  }
  numbers[x][y] = 9;
  size = 1;
  if (x - 1 >= 0 && numbers[x - 1][y] !== 9) {
    size += floodFill(numbers, x - 1, y);
  }
  if (x + 1 < numbers.length && numbers[x + 1][y] !== 9) {
    size += floodFill(numbers, x + 1, y);
  }
  if (y - 1 >= 0 && numbers[x][y - 1] !== 9) {
    size += floodFill(numbers, x, y - 1);
  }
  if (y + 1 < numbers[x].length && numbers[x][y + 1] !== 9) {
    size += floodFill(numbers, x, y + 1);
  }
  return size;
}

function part1() {
  // read file day09input
  const numbers = readFile("day09input");

  // find local minima
  const localMinima = findLocalMinima(numbers).localMinima;

  // sum up all local minima and add length of local minima
  const sum = _.sum(localMinima) + localMinima.length;

  // print result
  console.log(sum);
}

function part2() {
  // read file day09input
  const numbers = readFile("day09input");

  // find local minima
  const localMinima = findLocalMinima(numbers).localMinimaCoordinates;

  // iterst over local minima and flood fill from each local minima, store the size of the filled area in array
  const sizes = localMinima.map(([i, j]) => floodFill(numbers, i, j));

  // find largest 3 sizes and multiply them
  const largest3 = _.sortBy(sizes).slice(-3);
  const result = _.reduce(largest3, (a, b) => a * b);

  // print result
  console.log(result);
}

part2();
