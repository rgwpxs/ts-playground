/**
 * 13. 罗马数字转整数
 */
function romanToInt(s: string): number {
    if(!s) return 0;
    const m = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    if (s.length === 1) return m[s[0]];
    let nums = [m[s[0]]], result = m[s[0]];
    for (let i = 1; i < s.length; i++) {
        const cur = m[s[i]];
        console.log(i, cur, JSON.stringify(nums))
        if (nums[i - 1] >= cur) {
            result += cur;
        } else {
            result = result - nums[i - 1] + cur - nums[i - 1];
        }
        nums.push(cur);
    }
    return result
};