/**
 * 42 接雨水
 * @param height
 * @returns 
 */
function trap(height: number[]): number {
    let result = 0;
    let diffR = 0, leftIndex = 0, diffL = 0, rightIndex = height.length - 1;
    for (let i = 1; i < height.length; i++) {
        if (height[i] >= height[leftIndex] && !diffR) {
            leftIndex = i;
        } else if (height[i] >= height[leftIndex] && diffR) {
            result += diffR;
            // console.log(leftIndex, i, diffR, result);
            diffR = 0;
            leftIndex = i;
        } else if (height[i] < height[leftIndex]) {
            // console.log('increase by', height[leftIndex] - height[i]);
            diffR += height[leftIndex] - height[i];
        }
    }
    if (diffR) {
        for (let j = height.length - 2; j >= leftIndex; j--) {
            if (height[j] >= height[rightIndex] && !diffL) {
                rightIndex = j;
            } else if (height[j] >= height[rightIndex] && diffL) {
                result += diffL;
                // console.log(j, rightIndex, diffL, result);
                diffL = 0;
                rightIndex = j;
            } else if (height[j] < height[rightIndex]) {
                diffL += height[rightIndex] - height[j];
            }
        }
    }
    console.log(result);
    return result;
};

trap([0,1,0,2,1,0,1,3,2,1,2,1]) // 6
trap([4,2,0,3,2,5]) // 9
trap([4,2,3]) // 1