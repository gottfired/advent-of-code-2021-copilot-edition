// import lodash and fs
import * as _ from "lodash";
import * as fs from "fs";

// create score map data structure
// ) is worth 3
// ] is worth 57
// } is worth 1197
// > is worth 25137
const scoreMap: { [key: string]: number } = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

function part1() {
    // read day10sample
    const input = fs.readFileSync("day10input", "utf8").split("\n");

    // lines contain brackets (), [], {}, <>
    // parse each line push open brackets to stack
    // if close bracket is found, pop from stack if stack top is matching opening bracket
    // if close bracket does not match opening bracket abort and store closing bracket to result array
    // return result array
    const stack: string[] = [];
    const result: string[] = [];
    for (const line of input) {
        for (const char of line) {
            if (char === "(" || char === "[" || char === "{" || char === "<") {
                stack.push(char);
            } else if (char === ")" || char === "]" || char === "}" || char === ">") {
                if (stack.length === 0) {
                    result.push(char);
                } else {
                    const top = stack.pop();
                    if (
                        (top === "(" && char !== ")") ||
                        (top === "[" && char !== "]") ||
                        (top === "{" && char !== "}") ||
                        (top === "<" && char !== ">")
                    ) {
                        result.push(char);
                    }
                }
            }
        }
    }

    // go over result and add up scores
    let score = 0;
    for (const char of result) {
        score += scoreMap[char];
    }

    console.log(score);
}

function part2() {
    // read day10sample
    const input = fs.readFileSync("day10input", "utf8").split("\n");

    // lines contain brackets (), [], {}, <>
    // parse each line push open brackets to stack
    // if close bracket is found, pop from stack if stack top is matching opening bracket
    // if close bracket does not match opening bracket stop parsing this line
    // after line is parsed, if stack is not empty store line in result array also store stack in stackResults
    // return result array
    const stack: string[] = [];
    const result: string[] = [];
    const stackResults: string[][] = [];
    for (const line of input) {
        for (const char of line) {
            if (char === "(" || char === "[" || char === "{" || char === "<") {
                stack.push(char);
            } else if (char === ")" || char === "]" || char === "}" || char === ">") {
                if (stack.length === 0) {
                    // clear stack
                    stack.length = 0;
                    break;
                } else {
                    const top = stack.pop();
                    if (
                        (top === "(" && char !== ")") ||
                        (top === "[" && char !== "]") ||
                        (top === "{" && char !== "}") ||
                        (top === "<" && char !== ">")
                    ) {
                        // clear stack
                        stack.length = 0;
                        break;
                    }
                }
            }
        }
        if (stack.length > 0) {
            result.push(line);
            stackResults.push(stack.slice());
            // reset stack
            stack.length = 0;
        }
    }

    // print stack results as strings
    for (const stackResult of stackResults) {
        console.log(stackResult.join(""));
    }

    // go over stackResults, reverse each stack
    // return
    for (let i = 0; i < stackResults.length; i++) {
        stackResults[i].reverse();
    }

    // new scoring map
    // (: 1 point.
    // [: 2 points.
    // {: 3 points.
    // <: 4 points.
    const newScoreMap: { [key: string]: number } = {
        "(": 1,
        "[": 2,
        "{": 3,
        "<": 4,
    };

    // go over stackResults and create score for each line
    // line score is done as follows: multiply existing line score by 5 and then add new score
    // store line score in lineScores
    const lineScores: number[] = [];
    for (let i = 0; i < stackResults.length; i++) {
        let lineScore = 0;
        for (const char of stackResults[i]) {
            lineScore *= 5;
            lineScore += newScoreMap[char];
        }
        console.log("lineScore", lineScore);
        lineScores.push(lineScore);
    }

    // sort scores and print middle
    const sortedScores = lineScores.sort((a, b) => a - b);
    console.log(sortedScores[Math.floor(sortedScores.length / 2)]);
}

part2();
