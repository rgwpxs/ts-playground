/**
 * 137. 只出现一次的数字 II
 * @param nums 
 * @returns 
 */
function singleNumber(nums: number[]): number {
    const r = {};
    for (let i = 0; i < nums.length; i++) {
        const v = nums[i];
        if (!r[v]) {
            r[v] = 1;
        } else if (r[v] === 2) {
            delete r[v];
        } else {
            r[v]++
        }
    }
    for (let k in r) {
        if (r.hasOwnProperty(k)) {
            return parseInt(k);
        }
    }
    return;
};