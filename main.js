const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0]);
const Buildings = input.slice(1).map((str) => str.split(" ").map(Number));

function getMaxProfit(buildings, length) {
  let maxProfit = 0;

  // 각 건물 위치에서의 최대 이익을 계산하는 함수
  const calculateMaxProfit = () => {
    const maxProfitAtPosition = new Array(length).fill(0); // 각 위치에서의 최대 이익을 저장할 배열 초기화
    for (let i = 0; i < length; i++) {
      // 각 위치에 대해 최대 이익 계산
      maxProfitAtPosition[i] = buildings[i][2]; // 초기값은 해당 건물의 이익
      for (let j = 0; j < i; j++) {
        // 현재 위치의 건물보다 왼쪽에 있는 건물에 대해
        if (buildings[j][1] < buildings[i][1]) {
          // 높이가 더 낮은 건물이 있다면
          maxProfitAtPosition[i] = Math.max(
            // 현재 위치에서의 최대 이익을 갱신
            maxProfitAtPosition[i],
            maxProfitAtPosition[j] + buildings[i][2]
          );
        }
      }
    }
    return Math.max(...maxProfitAtPosition); // 모든 위치에서의 최대 이익 중 가장 큰 값을 반환
  };

  // 건물 위치를 기준으로 오름차순 정렬 후 최대 이익 계산
  buildings.sort((a, b) => a[0] - b[0]);
  maxProfit = Math.max(maxProfit, calculateMaxProfit());

  // 건물 위치를 기준으로 내림차순 정렬 후 최대 이익 계산
  buildings.sort((a, b) => b[0] - a[0]);
  maxProfit = Math.max(maxProfit, calculateMaxProfit());

  console.log(maxProfit);
}

getMaxProfit(Buildings, N);
