/**
 * 136. 只出现一次的数字
 */

function singleNumber(nums: number[]): number {
    const record = {};
    for (let i = 0; i < nums.length; i++) {
        const v = nums[i];
        if (!record[v]) {
            record[v] = 1;
        } else if (record[v] === 1) {
            delete record[v];
        }
    }
    for (let k in record) {
        if (record.hasOwnProperty(k)) {
            return parseInt(k);
        }
    }
    return;
};