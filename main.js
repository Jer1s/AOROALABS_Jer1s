const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const Trees = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function treeCutting(trees, length, target) {
  let low = 0;
  let high = trees[length - 1];
  let result = 0;
  while (low <= high) {
    let sum = 0;
    let mid = Math.floor((low + high) / 2);
    trees.map((tree) => {
      if (tree > mid) {
        sum += tree - mid;
      }
    });
    if (sum >= target) {
      result = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  console.log(result);
}

treeCutting(Trees, N, M);
