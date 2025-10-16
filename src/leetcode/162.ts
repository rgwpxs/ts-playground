/**
 * 162. 寻找峰值
 */

function findPeakElement(nums: number[]): number {
    if (nums.length === 1) return 0;
    if (nums.length === 2) return nums[1] > nums[0] ? 1 : 0;
    for(let i = 1; i < nums.length - 1; i++) {
        const l = nums[i - 1];
        const r = nums[i + 1];
        if (nums[i] > l && nums[i] > r) {
            return i;
        }
    }
    if (nums[nums.length - 1] > nums[0]) {
        return nums.length - 1;
    }
    return 0;
};