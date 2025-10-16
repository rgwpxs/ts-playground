/**
 * 238. 除自身以外数组的乘积
 * @param nums 
 * @returns 
 */
function productExceptSelf(nums: number[]): number[] {
    if (!nums || !nums.length) return nums;
    if (nums.length === 1) return [0];
    let answer: number[] = nums.map(n => 1), acc = 1;
    for (let i = 0; i < nums.length; i++) {
        answer[i] = acc;
        acc = acc * nums[i];
    }
    acc = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        answer[i] = answer[i] * acc;
        acc = acc * nums[i];
    }
    return answer;
};