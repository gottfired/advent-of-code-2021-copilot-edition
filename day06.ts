// import fs and lodash
import * as _ from "lodash";
import * as fs from "fs";

// data structure linked list of numbers
class Node {
  public value: number;
  public next: Node | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

// data structure named List holding a linked list of numbers and last node
class List {
  public head: Node | null;
  public last: Node | null;
  constructor() {
    this.head = null;
    this.last = null;
  }
  // add a node to the end of the list
  add(value: number) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else if (this.last) {
      this.last.next = node;
    }
    this.last = node;
  }
  // print the as comma separated values
  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.value + ",";
      current = current.next;
    }
    console.log(result);
  }
  // return the number of nodes in the list
  length() {
    let current = this.head;
    let count = 0;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
}

// function to read input file which is comma separated list of numbers, returns List
function readInput(fileName: string): List {
  const list = new List();
  const input = fs.readFileSync(fileName, "utf8");
  const numbers = input.split(",");
  for (const number of numbers) {
    list.add(parseInt(number, 10));
  }
  return list;
}

// function process with input of type List
// if value is > 0 then reduce by one
// if value is 0 then set to 6 and append 9 at end of list
// return list
function process(input: List): List {
  let current = input.head;
  while (current) {
    if (current.value > 0) {
      current.value--;
    } else if (current.value === 0) {
      current.value = 6;
      input.add(9);
    }
    current = current.next;
  }
  return input;
}

function part1() {
  // read file day06input
  let input = readInput("day06input");

  // process input 256 times
  for (let i = 0; i < 256; i++) {
    input = process(input);
  }

  // print length of list
  console.log(input.length());
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Everything below here was hand coded and NOT using copilot which was wayyyy to dumb to understand what I want!

const childCountCache = {} as { [key: string]: number };

function numChildren(cycle: number, numSteps: number): number {
  if (numSteps < cycle + 1) {
    return 0;
  }

  // subtract cycle+1 so we start at cycle count 6 which is birth date
  const steps = numSteps - cycle - 1;
  const directChildren = 1 + Math.floor(steps / 7);
  let sum = 0;
  for (let i = steps; i >= 7; i -= 7) {
    // if we have a cached value use that
    if (!!childCountCache[`8,${i}`]) {
      sum += childCountCache[`8,${i}`];
    } else {
      // else calculate it and cache it
      const num = numChildren(8, i);
      childCountCache[`8,${i}`] = num;
      sum += num;
    }
  }
  return sum + directChildren;
}

// function to read comma separated list of numbers into number array
function readInput2(fileName: string): number[] {
  const input = fs.readFileSync(fileName, "utf8");
  const numbers = input.split(",");
  const result = [];
  for (const number of numbers) {
    result.push(parseInt(number, 10));
  }
  return result;
}

function part2() {
  // read file day06input as comma separated list of numbers into array
  const input = readInput2("day06input");

  // cache warmup by going from 0 to 256 which is fast, because higher values can use cached values from lower values
  for (let i = 0; i < 256; i++) {
    numChildren(8, i);
  }

  // for each number in input calculate number of children after 18 steps
  // sum them all up and add length of input
  let sum = 0;
  for (const number of input) {
    const children = numChildren(number, 256);
    sum += children;
  }
  sum += input.length;
  console.log(sum);
}

part2();
