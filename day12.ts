// import fs and lodash
import * as _ from "lodash";
import * as fs from "fs";

// define type Path as array of strings
type Path = string[];

// class Node
// a has a string value
// a node has member isSmall
// a node has a list of neighbors
class Node {
  value: string;
  isSmall: boolean;
  neighbors: Node[];

  constructor(value: string) {
    this.value = value;
    // isSmall is true if value is only lowercase and not "start" or "end"
    this.isSmall = value.toLowerCase() === value;
    this.neighbors = [];
  }

  // function getPaths with input
  // currentPath: Path
  // paths: array of all paths
  // function is recursive
  // append current node value to currentPath
  // if current node is "end", add currentPath to paths and exit
  // for each neighbor, call getPaths with a deep copy of currentPath and paths
  // don't do this for small neighbors that are already in currentPath
  // return paths
  getPaths(currentPath: Path, paths: Path[]): Path[] {
    // append current node value to currentPath
    currentPath.push(this.value);

    // if current node is "end", add currentPath to paths and exit
    if (this.value === "end") {
      paths.push(currentPath);
      return paths;
    }

    // for each neighbor, call getPaths with a deep copy of currentPath and paths
    // don't do this for small neighbors that are already in currentPath
    for (let neighbor of this.neighbors) {
      if (neighbor.isSmall && !currentPath.includes(neighbor.value)) {
        neighbor.getPaths(currentPath.slice(), paths);
      }
      // do the same for big neighbors
      else if (!neighbor.isSmall) {
        neighbor.getPaths(currentPath.slice(), paths);
      }
    }

    return paths;
  }
}

// class Graph
// contains a list of nodes
// contains a start and end node
class Graph {
  nodes: Node[];
  start: Node | null;
  end: Node | null;

  constructor() {
    this.nodes = [];
    this.start = null;
    this.end = null;
  }

  // addNode
  // add a node to the graph
  addNode(value: string): void {
    // Only add node if it doesn't already exist
    if (!this.getNode(value)) {
      // create new node
      let node = new Node(value);
      this.nodes.push(node);

      // store if start or end
      if (value === "start") {
        this.start = node;
      } else if (value === "end") {
        this.end = node;
      }
    }
  }

  // addEdge
  // add an edge to the graph
  addEdge(from: string, to: string): void {
    let fromNode = this.getNode(from);
    let toNode = this.getNode(to);
    if (fromNode && toNode) {
      fromNode.neighbors.push(toNode);
      toNode.neighbors.push(fromNode);
    }
  }

  // getNode
  // get a node from the graph
  getNode(value: string): Node | undefined {
    return _.find(this.nodes, { value: value });
  }
}

// function reads file describing a graph
// each line contains two nodes separated by a dash
// there are small and big nodes
// two nodes are special nodes "start" and "end"
// parse the file into a graph
function readFile(fileName: string): Graph {
  let graph = new Graph();
  let lines = fs.readFileSync(fileName, "utf8").split("\n");
  for (let line of lines) {
    let parts = line.split("-");
    graph.addNode(parts[0]);
    graph.addNode(parts[1]);
    graph.addEdge(parts[0], parts[1]);
  }
  return graph;
}

function part1() {
  // read file day12sample
  let graph = readFile("day12input");

  // find all paths from start if start exists
  let paths = graph.start ? graph.start.getPaths([], []) : [];

  // pretty print paths as dash separated strings and num paths
  console.log(_.map(paths, (path) => path.join("-")));
  console.log(paths.length);
}

part1();
