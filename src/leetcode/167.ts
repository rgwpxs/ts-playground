/**
 * 167. 两数之和 II - 输入有序数组
 */

function twoSum(numbers: number[], target: number): number[] {
    for (let i = 0; i < numbers.length; i++) {
        let remain = target - numbers[i];
        if (remain < numbers[i]) return [];
        for (let j = i + 1; j < numbers.length; j++) {
            if (remain === numbers[j]) {
                return [i + 1, j + 1];
            }
        }
    }
    return [];
};