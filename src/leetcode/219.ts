/**
 * 219. 存在重复元素
 */

function containsNearbyDuplicate(nums: number[], k: number): boolean {
    let m = new Map();
    for (let i = 0; i < nums.length; i++) {
        const v = nums[i];
        if (m.has(v) && Math.abs(m.get(v) - i) <= k) {
            return true;
        } else {
            m.set(v, i);
        }
    }
    return false;
};