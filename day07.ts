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

part1();
