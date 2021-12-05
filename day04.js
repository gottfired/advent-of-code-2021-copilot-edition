// import lodash and lodash-transpose
var _ = require("lodash");
var transpose = require("lodash-transpose");

// function that reads file
// first line is a comma separated list of numbers
// then follows a list of 5 x 5 matrices separated by a newline
// between each matrix is ane empty line
// each matrix element is separated by a space
function readFile(fileName) {
  var fs = require("fs");
  var file = fs.readFileSync(fileName, "utf8");
  var lines = file.split("\n");
  var numbers = lines[0].split(",");

  // convert numbers to numbers
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = Number(numbers[i]);
  }

  // remove first line from input, name result matrixInput
  var matrixInput = _.drop(lines);

  // remove empty strings from matrixInput
  matrixInput = _.filter(matrixInput, function (line) {
    return line !== "";
  });

  // split matrix input into array of 5 lines
  matrixInput = _.chunk(matrixInput, 5);

  // convert each line in a matrix to numbers separated by one or more spaces
  matrixInput = _.map(matrixInput, function (line) {
    return _.map(line, function (element) {
      let a = _.split(element, /\s+/);
      // remove empty strings from a
      a = _.filter(a, function (element) {
        return element !== "";
      });

      // convert each element in a to a number and return
      return _.map(a, function (element) {
        return parseInt(element);
      });
    });
  });

  // return numbers and matrixInput, rename matrixInput to matrices
  return {
    numbers: numbers,
    matrices: matrixInput,
  };
}

function calculateScore(matrix, sheet, winningNumber) {
  // sum is 0
  let sum = 0;

  // matrix is a two dimensional array
  // iterate over all elements of matrix
  for (let j = 0; j < matrix.length; j++) {
    for (let k = 0; k < matrix[j].length; k++) {
      // take element at index j in line k of sheet
      let element = sheet[j][k];
      // if element is false then sum is incremented by entry at index j in line k of matrix
      if (element === false) {
        sum += matrix[j][k];
      }
    }
  }

  // multiply sum by winningNumber and return
  return sum * winningNumber;
}

function part1() {
  // read file day04sample
  var data = readFile("day04input");

  // copy matrices to new data structure names sheets where each element can be marked with a boolean
  let sheets = _.map(data.matrices, function (matrix) {
    return _.map(matrix, function (line) {
      return _.map(line, function (element) {
        return false;
      });
    });
  });

  // variable winningMatrix is set to null
  let winningMatrix = null;

  // variable winningNumber and winningIndex are set to 0
  let winningNumber = 0;
  let winningIndex = 0;

  // iterate over data.numbers using a for loop, stop if winningMatrix is not null
  for (let i = 0; i < data.numbers.length && winningMatrix === null; i++) {
    // take number at index i from data.numbers
    let number = data.numbers[i];

    // iterate over all data.matrices
    // for each matrix, iterate over all lines
    for (let j = 0; j < data.matrices.length; j++) {
      // for each line, iterate over all elements
      for (let k = 0; k < data.matrices[j].length; k++) {
        for (let l = 0; l < data.matrices[j][k].length; l++) {
          // if element at index l in line k in matrix j is equal to number
          if (data.matrices[j][k][l] === number) {
            // mark element at index l in line k in matrix j as true
            sheets[j][k][l] = true;
          }
        }
      }
    }

    // iterate over all sheets
    for (let j = 0; j < sheets.length; j++) {
      // take sheet
      let sheet = sheets[j];

      // if any row of sheet is completely marked with true then winningMatrix is set to matrix from data.matrices at index j
      if (
        _.some(sheet, function (line) {
          return _.every(line, function (element) {
            return element === true;
          });
        })
      ) {
        winningMatrix = data.matrices[j];
        // store winning number and index
        winningNumber = number;
        winningIndex = j;
      }

      // sheet columns are transposed
      // if any column is compleetly marked with true then winningMatrix is set to matrix from data.matrices at index j
      if (
        _.some(transpose.transpose(sheet), function (line) {
          return _.every(line, function (element) {
            return element === true;
          });
        })
      ) {
        winningMatrix = data.matrices[j];
        // store winning number and index
        winningNumber = number;
        winningIndex = j;
      }
    }
  }

  // take winningSheet with winningIndex from sheets
  let winningSheet = sheets[winningIndex];

  // calculate and print score for winningMatrix and winningSheet
  console.log(calculateScore(winningMatrix, winningSheet, winningNumber));
}

function part2() {
  // read file day04sample
  var data = readFile("day04input");

  // copy matrices to new data structure names sheets where each element can be marked with a boolean
  let sheets = _.map(data.matrices, function (matrix) {
    return _.map(matrix, function (line) {
      return _.map(line, function (element) {
        return false;
      });
    });
  });

  // initialize winner array same length as data.matrices with false
  let winners = _.map(data.matrices, function () {
    return false;
  });

  // init lastWinner as -1
  let lastWinner = -1;

  // init winningNumber
  let winningNumber = 0;

  // iterate over data.numbers using a for loop, stop if winningMatrix is not null
  for (let i = 0; i < data.numbers.length; i++) {
    // take number at index i from data.numbers
    let number = data.numbers[i];

    // iterate over all data.matrices
    // for each matrix, iterate over all lines
    for (let j = 0; j < data.matrices.length; j++) {
      // for each line, iterate over all elements
      for (let k = 0; k < data.matrices[j].length; k++) {
        for (let l = 0; l < data.matrices[j][k].length; l++) {
          // if element at index l in line k in matrix j is equal to number
          if (data.matrices[j][k][l] === number) {
            // mark element at index l in line k in matrix j as true
            sheets[j][k][l] = true;
          }
        }
      }
    }

    // iterate over all sheets
    for (let j = 0; j < sheets.length; j++) {
      // take sheet
      let sheet = sheets[j];

      // if any row of sheet is completely marked with true then winningMatrix is set to matrix from data.matrices at index j
      if (
        _.some(sheet, function (line) {
          return _.every(line, function (element) {
            return element === true;
          });
        })
      ) {
        // if j not already a winner mark winner at index j as true and store as lastWinner, winingNumber
        if (winners[j] === false) {
          winners[j] = true;
          lastWinner = j;
          winningNumber = number;
        }
      }

      // sheet columns are transposed
      // if any column is compleetly marked with true then winningMatrix is set to matrix from data.matrices at index j
      if (
        _.some(transpose.transpose(sheet), function (line) {
          return _.every(line, function (element) {
            return element === true;
          });
        })
      ) {
        // if j not already a winner mark winner at index j as true and store as lastWinner, winingNumber
        if (winners[j] === false) {
          winners[j] = true;
          lastWinner = j;
          winningNumber = number;
        }
      }
    }

    // count number of winners, if all have won, exit loop
    let count = _.countBy(winners, function (element) {
      return element;
    })["true"];
    if (count === data.matrices.length) {
      break;
    }
  }

  // winningMatrix is matrix at index lastWinner from data.matrices, winningSheet is sheet at index lastWinner from sheets
  let winningMatrix = data.matrices[lastWinner];
  let winningSheet = sheets[lastWinner];

  // print lastWinner, winninMatrix, winningSheet, winningNumber
  console.log(
    lastWinner,
    winningMatrix,
    winningSheet,
    winningNumber,
    calculateScore(winningMatrix, winningSheet, winningNumber)
  );

  // calculate and print score for winningMatrix and winningSheet
  console.log(calculateScore(winningMatrix, winningSheet, winningNumber));
}

part2();
