// import lodash and fs
import * as _ from 'lodash';
import * as fs from 'fs';

// data structure for 2d vector
interface Vector2 {
    x: number;
    y: number;
}

// data structure line holding start and end
interface Line {
    start: Vector2;
    end: Vector2;
}

// function reads file of lines with this format: x,y -> x,y
// and returns array of lines
function readInput(fileName: string): Line[] {
    const input = fs.readFileSync(fileName, 'utf8');
    const lines = input.split('\n');
    const result: Line[] = [];
    for (const line of lines) {
        const [start, end] = line.split(' -> ');
        const [x1, y1] = start.split(',').map(Number);
        const [x2, y2] = end.split(',').map(Number);
        result.push({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 } });
    }
    return result;
}

function part1() {
    // read day05input 
    const lines = readInput('day05input');

    // for all lines take the start and end points. find max x and y
    let maxX = 0;
    let maxY = 0;
    for (const line of lines) {
        maxX = Math.max(maxX, Math.max(line.start.x, line.end.x));
        maxY = Math.max(maxY, Math.max(line.start.y, line.end.y));
    }

    // create 2d array of numbers with maxX and maxY, init with 0
    const grid: number[][] = _.range(maxX + 1).map(() => _.range(maxY + 1).map(() => 0));

    // draw lines on grid for lines where x or y stays constant
    // increase grid value when line crosses
    // lines can go backwards
    for (const line of lines) {
        if (line.start.x === line.end.x) {
            for (let y = Math.min(line.start.y, line.end.y); y <= Math.max(line.start.y, line.end.y); y++) {
                grid[line.start.x][y]++;
            }
        } else if (line.start.y === line.end.y) {
            for (let x = Math.min(line.start.x, line.end.x); x <= Math.max(line.start.x, line.end.x); x++) {
                grid[x][line.start.y]++;
            }
        }
    }
    
    // count number of grid points >= 2
    let count = 0;
    for (const row of grid) {
        for (const value of row) {
            if (value >= 2) {
                count++;
            }
        }
    }
    
    // pretty print grid as 2d array in console with . if value is 0 otherwise print the number
    console.log('\n');
    for (const row of grid) {
        console.log(row.map(value => value === 0 ? '.' : value).join(' '));
    }

    // pretty print result
    console.log(`Part 1: ${count}`);
    
}

// function part2 is the same as part1 but also with diagonal lines 
function part2() {
    // read day05input
    const lines = readInput('day05input');

    // for all lines take the start and end points. find max x and y
    let maxX = 0;
    let maxY = 0;
    for (const line of lines) {
        maxX = Math.max(maxX, Math.max(line.start.x, line.end.x));
        maxY = Math.max(maxY, Math.max(line.start.y, line.end.y));
    }

    // create 2d array of numbers with maxX and maxY, init with 0
    const grid: number[][] = _.range(maxX + 1).map(() => _.range(maxY + 1).map(() => 0));

    // draw lines on grid for lines where x or y stays constant
    // increase grid value when line crosses
    // lines can go backwards
    for (const line of lines) {
        if (line.start.x === line.end.x) {
            for (let y = Math.min(line.start.y, line.end.y); y <= Math.max(line.start.y, line.end.y); y++) {
                grid[line.start.x][y]++;
            }
        } else if (line.start.y === line.end.y) {
            for (let x = Math.min(line.start.x, line.end.x); x <= Math.max(line.start.x, line.end.x); x++) {
                grid[x][line.start.y]++;
            }
        } else {
            // calculate slope
            const slope = (line.end.y - line.start.y) / (line.end.x - line.start.x);
            // calculate y intercept
            const yIntercept = line.start.y - slope * line.start.x;
            // calculate x intercept
            const xIntercept = -yIntercept / slope;
            // calculate x and y for all points on line
            const x = _.range(Math.min(line.start.x, line.end.x), Math.max(line.start.x, line.end.x) + 1);
            const y = x.map(x => slope * x + yIntercept);
            // increase grid value for all points on line
            for (let i = 0; i < x.length; i++) {
                grid[x[i]][y[i]]++;
            }
        }
    }

    // count number of grid points >= 2
    let count = 0;
    for (const row of grid) {
        for (const value of row) {
            if (value >= 2) {
                count++;
            }
        }
    }

    // pretty print grid as 2d array in console with . if value is 0 otherwise print the number
    console.log('\n');
    for (const row of grid) {
        console.log(row.map(value => value === 0 ? '.' : value).join(' '));
    }

    // pretty print result
    console.log(`Part 2: ${count}`);
}

part2();

