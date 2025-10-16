/**
 * 1. 两数之和
 * @param nums 
 * @param target 
 * @returns 
 */
function twoSum(nums: number[], target: number): number[] {
    const m = new Map();
    for (let i = 0; i < nums.length; i++) {
        const r = target - nums[i];
        // console.log(i, nums[i], r);
        if (m.has(r)) {
            return [m.get(r), i];
        } else {
            m.set(nums[i], i);
        }
    }
    return []
};