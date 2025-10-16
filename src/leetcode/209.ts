/**
 * 209. 长度最小的子数组
 */

function minSubArrayLen(target: number, nums: number[]): number {
    console.log(target, nums.length);
    let last = [], current = [];
    let acc = [0], idx = 0;
    let min = nums.length, valid = false;
    for (let i = 0; i < nums.length; i++) {
        acc[idx] += nums[i];
        current.push(nums[i]);
        if(acc[idx] >= target) {
            valid = true;
            let overflow = acc[idx] - target;
            while (overflow >= current[0]) {
                const t = current[0];
                overflow = overflow - t;
                acc[idx] -= t;
                current.shift();
            }
            min = Math.min(min, current.length);
            // console.log('--i--', i, idx, current.length === min);
            if (i === nums.length - 1) return min;
            idx++;
            acc[idx] = acc[idx - 1] - current[0];
            current.shift();
        }
    }
    return valid ? min : 0;
};