/**
 * 228. 汇总区间
 * @param nums 
 * @returns 
 */
function summaryRanges(nums: number[]): string[] {
    if (!nums?.length) return [];
    const result = [];
    let start = nums[0], pre = nums[0];
    for(let i = 1; i < nums.length; i++) {
        const cur = nums[i];
        if (cur - pre === 1) {
            pre = cur;
        } else if (start === pre) {
            result.push('' + start);
            start = cur;
            pre = cur;
        } else {
            result.push(`${start}->${pre}`);
            start = cur;
            pre = cur;
        }
    }
    const last = start === pre ? '' + pre : `${start}->${pre}`;
    result.push(last);
    return result;
};