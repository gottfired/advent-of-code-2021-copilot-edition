// import lodash and fs
import * as _ from "lodash";
import * as fs from "fs";

// function to read input of comma separated numbers
function readInput(fileName: string): number[] {
  // read the file
  const input = fs.readFileSync(fileName, "utf8");
  // split the input by comma
  const inputArray = input.split(",");
  // return the input as an array of numbers
  return inputArray.map(Number);
}

function part1() {
  // read day07sample
  const input = readInput("day07input");

  // input are horizontal crab positions.
  // increase a crab position by 1 costs 1 fuel
  // decrease a crab position by 1 costs 1 fuel
  // calculate cost for moving all crabs to position 2
  const cost = input.reduce((acc, curr) => acc + Math.abs(curr - 2), 0);

  // find min and max positions of input
  const min = _.min(input) ?? 0;
  const max = _.max(input) ?? 0;

  // find target position between min and max with lowest cost
  const target = _.range(min, max + 1).reduce(
    (acc: any, current) => {
      const cost = input.reduce(
        (acc, curr) => acc + Math.abs(curr - current),
        0
      );
      if (cost < acc.cost) {
        return {
          cost: cost,
          position: current,
        };
      }
      return acc;
    },
    {
      cost: Number.MAX_VALUE,
      position: 0,
    }
  );

  // print target
  console.log(target);

  // output cost
  //   console.log(`Part 1: ${cost}`);
}

// function calcCost, input number start, input number target
// dist is the distance from start to target
// cost is dist * (dist + 1) / 2
function calcCost(start: number, target: number): number {
  const dist = Math.abs(start - target);
  return (dist * (dist + 1)) / 2;
}

function part2() {
  // read day07input
  const input = readInput("day07input");

  // input are horizontal crab positions.
  // calculate cost for moving all crab to position 5 using calcCost
  const cost = input.reduce((acc, curr) => acc + calcCost(curr, 5), 0);

  // find min and max positions of input
  const min = _.min(input) ?? 0;
  const max = _.max(input) ?? 0;

  // find target position between min and max with lowest cost
  const target = _.range(min, max + 1).reduce(
    (acc: any, current) => {
      const cost = input.reduce(
        (acc, curr) => acc + calcCost(curr, current),
        0
      );
      if (cost < acc.cost) {
        return {
          cost: cost,
          position: current,
        };
      }
      return acc;
    },
    {
      cost: Number.MAX_VALUE,
      position: 0,
    }
  );

  // print target
  console.log(target);

  // print cost
  //   console.log(`Part 2: ${cost}`);
}

part2();
