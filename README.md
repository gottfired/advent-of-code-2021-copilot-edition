# Advent of code 2021 github copilot edition

None of the code was written by me. I only write comments and then use autocomplete.

Exceptions: day6/pt2 and day8/pt2, where I gave up and implemented manually.

## Screencast of day 7

https://youtu.be/XvoCyVFQOm8

## Lessons learned

- Use types. Days 1-4 I used plain JS, but without type information copilot often didn't have enough information to use data structures in a correct way. I had to explicitely e.g. say "data is a 2d matrix of numbers"
- Use natural language to describe your functions. This works better than describing in pseudo code. E.g. don't say "read a file of lines which contains vectors separated by -> where coordinates are comma separated". Instead say, read file with lines that look like this x,y -> x,y.
  - For example on day4 I used a pseudo code approach. This became very tedious, where writing the code myself would've been way faster and less error prone
  - On day5 I used types and natural language. The result was a lot better.
- day7 part 2. Had to put the cost algorithm into a separate function, otherwise codepilot insisted on reusing the same cost function as for part 1.
- In general already start off by separating your code into functions. It's easier for copilot to reference those steps later on. Also refactoring with copilot later on doesn't work and I'm **not allowed to touch the code** which is a problem. Sometimes I had the case where an algorithm was autocompleted correctly and as I wanted to describe the same thing as a separate function using the same wording, copilot refused to write it correctly again. I have the suspicion that copilot, if a code is once generated doesn't repeat itself thinking that the code before might have been wrong and thus tries to find a more correct solution if provided with the same comments.

## Highlights so far

- day2 I could copy and paste the instructions from AOC and it worked
- day5 I could say `// function part2 is the same as part1 but also with diagonal lines`. **Thats pretty amazing!**
- day9 Recursive flood fill algorithm without me needing to touch the code. Also whole day went very smooth with minimal rephrasing.

## Lowlights so far

- day6 part 2. Copilot didn't understand what I want. Had to hand code it.
- day8 part 2. I have no idea how I should've explained the solution to copilot, so again manual implementation.
