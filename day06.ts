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

part1();
