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

function part2() {
  // read day08sample
}

part1();
