# Advent of code 2021 github copilot edition

None of the code was written by me. I only write comments and then use autocomplete.

## Lessons learned

- Use types. Days 1-4 I used plain JS, but without type information copilot often didn't have enough information to use data structures in a correct way. I had to explicitely e.g. say "data is a 2d matrix of numbers"
- Use natural language to describe your functions. This works better than describing in pseudo code. E.g. don't say "read a file of lines which contains vectors separated by -> where coordinates are comma separated". Instead say, read file with lines that look like this x,y -> x,y.
  - For example on day4 I used a pseudo code approach. This became very tedious, where writing the code myself would've been way faster and less error prone
  - On day5 I used types and natural language. The result was a lot better.

## Highlights so far

- day2 I could copy and paste the instructions from AOC and it worked
- day5 I could say `// function part2 is the same as part1 but also with diagonal lines`. **Thats pretty amazing!**

## Lowlights so far

- day6 part 2. Copilot didn't understand what I want. Had to hand code it.
