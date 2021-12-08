// import lodash and fs
import * as _ from "lodash";
import * as fs from "fs";

// create interface IData with input = array of strings and output = array of strings
interface IData {
  input: string[];
  output: string[];
}

// create function to read file where each line is like "asdf adg sdfsdfg | asdaf asdasdf asdasdf"
// each line is split by " | " and each part is split by " ", then create an IData for each line, first part is input, second part is output
function readFile(fileName: string): IData[] {
  let data: IData[] = [];
  let lines: string[] = fs.readFileSync(fileName).toString().split("\n");
  for (let line of lines) {
    let parts: string[] = line.split(" | ");
    let input: string[] = parts[0].split(" ");
    let output: string[] = parts[1].split(" ");
    data.push({
      input: input,
      output: output,
    });
  }
  return data;
}

function part1() {
  // read day08input
  let data: IData[] = readFile("day08input");

  // go over all data and count all strings in ouput that have length 2, 3, 4 or 8
  let count: number = 0;
  for (let d of data) {
    for (let s of d.output) {
      if (
        s.length === 2 ||
        s.length === 3 ||
        s.length === 4 ||
        s.length === 7
      ) {
        count++;
      }
    }
  }

  // print result
  console.log(count);
}

// type of letters a to g
type Letters = "a" | "b" | "c" | "d" | "e" | "f" | "g";

// create class segments with members a to g, each member is an array of numbers
class Segments {
  a: number[];
  b: number[];
  c: number[];
  d: number[];
  e: number[];
  f: number[];
  g: number[];

  // constructor init all with []
  constructor() {
    this.a = [];
    this.b = [];
    this.c = [];
    this.d = [];
    this.e = [];
    this.f = [];
    this.g = [];
  }

  // function storeValuesForSegment that pushes the values for the matching segment
  storeValuesForSegment(segment: string, values: number[]) {
    switch (segment) {
      case "a":
        this.a = values;
        break;
      case "b":
        this.b = values;
        break;
      case "c":
        this.c = values;
        break;
      case "d":
        this.d = values;
        break;
      case "e":
        this.e = values;
        break;
      case "f":
        this.f = values;
        break;
      case "g":
        this.g = values;
        break;
    }
  }

  replaceOther(values: number[], common: number) {
    // find member with values
    let member = _.findKey(this, (v) => _.isEqual(v, values)) as Letters;
    const other = _.without(this[member], common);
    this[member] = other;
  }

  deduce(a: Letters, b: Letters, common: number) {
    let values = this[a];
    if (values.length > 0) {
      this[a] = [common];
      this.replaceOther(values, common);
      return a;
    } else if (this[b].length > 0) {
      let values = this[b];
      this[b] = [common];
      this.replaceOther(values, common);
      return b;
    }
  }

  getKeys(values: number[]) {
    let keys = _.keys(this);
    let result = _.filter(keys, (k) => _.isEqual(this[k as Letters], values));
    return result;
  }

  fillEmptySegment(values: number[]) {
    let keys = _.keys(this);
    let result = _.filter(keys, (k) => this[k as Letters].length === 0);
    for (let k of result) {
      this[k as Letters] = values;
    }
  }
}

// function that subtracts two strings. E.g. "abcde" - "cb" = "ade"
function subtract(a: string, b: string): string {
  let result: string = "";
  for (let i = 0; i < a.length; i++) {
    if (b.indexOf(a[i]) === -1) {
      result += a[i];
    }
  }
  return result;
}

// function that checks if all letters of a string are in another string
function allLettersInString(a: string, b: string): boolean {
  for (let i = 0; i < a.length; i++) {
    if (b.indexOf(a[i]) === -1) {
      return false;
    }
  }

  return true;
}

// function that takes an array of strings and returns Segments
function createSegments(input: string[]): Segments {
  let segments: Segments = new Segments();

  // find first string that has length 2 using lodash name it digitOne
  let digit1 = _.find(input, (s: string) => s.length === 2) as string;
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // at this point I gave up and coded manually with copilot helping out
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  segments[digit1[0] as Letters] = [2, 5];
  segments[digit1[1] as Letters] = [2, 5];

  const digit7 = _.find(input, (s: string) => s.length === 3) as string;
  let diff = subtract(digit7, digit1);
  // let segment0 = diff;
  segments[diff as Letters] = [0];

  // find first string that has length 4 using lodash name it digit4
  let digit4 = _.find(input, (s: string) => s.length === 4) as string;
  diff = subtract(digit4, digit1);

  segments[diff[0] as Letters] = [1, 3];
  segments[diff[1] as Letters] = [1, 3];

  // console.log("after digit 4", segments);

  // find first string that has length 5 containing all letters of digit7 using lodash name it digit3
  let digit3 = _.find(input, (s: string) => {
    return s.length === 5 && allLettersInString(digit7, s);
  }) as string;
  diff = subtract(digit3, digit7); // this gets us segments 3 or 6

  const match = segments.deduce(diff[0] as Letters, diff[1] as Letters, 3);
  if (match === diff[0]) {
    segments[diff[1] as Letters] = [6];
  } else {
    segments[diff[0] as Letters] = [6];
  }

  // console.log("after digit 3", segments);

  let keys0 = segments.getKeys([0]);
  let keys1 = segments.getKeys([1]);
  let keys3 = segments.getKeys([3]);
  let keys6 = segments.getKeys([6]);
  let keys25 = segments.getKeys([2, 5]);
  let digit5 = _.find(input, (s: string) => {
    return (
      s.length === 5 &&
      s.includes(keys0[0]) &&
      s.includes(keys1[0]) &&
      s.includes(keys3[0]) &&
      s.includes(keys6[0]) &&
      (s.includes(keys25[0]) || s.includes(keys25[1]))
    );
  }) as string;

  // console.log("digit 5", digit5);

  if (digit5.includes(keys25[0])) {
    segments[keys25[0] as Letters] = [5];
    segments.replaceOther([2, 5], 5);
  } else {
    segments[keys25[1] as Letters] = [5];
    segments.replaceOther([2, 5], 5);
  }

  // console.log("after digit 5", segments);

  segments.fillEmptySegment([4]);

  //   console.log(segments);

  return segments;
}

const mapping = [
  [2, 5],
  [0, 2, 3, 4, 6],
  [0, 2, 3, 5, 6],
  [1, 2, 3, 5],
  [0, 1, 3, 5, 6],
  [0, 1, 3, 4, 5, 6],
  [0, 2, 5],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 2, 3, 5, 6],
];

function getDigitForInput(segments: Segments, input: string): number {
  //split input into array of strings
  let inputArray = input.split("");
  // for each string in the array get matching segment and merge result into number array
  let result = inputArray.map((s) => {
    let segment = segments[s as Letters];
    return segment;
  });

  // flatten array of arrays
  let resultArray = _.flatten(result);

  // find index of entry in mapping that matches resultArray
  let index = _.findIndex(mapping, (m) => _.isEqual(m, resultArray.sort()));
  return index + 1;
}

function part2() {
  // read day08input
  let data: IData[] = readFile("day08input");

  let total = 0;
  for (let d of data) {
    const segments = createSegments(d.input);
    // iterate over output and print digit for each string
    let num = 0;
    for (let i = 0; i < d.output.length; i++) {
      num = num * 10 + getDigitForInput(segments, d.output[i]);
    }
    // console.log(num);
    total += num;
  }

  console.log(total);
}

part2();
