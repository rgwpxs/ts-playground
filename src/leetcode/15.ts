function threeSum(nums: number[]): number[][] {
    if (nums?.length < 3) return [];
    if (nums.length === 3) return nums.reduce((acc, cur) => acc+cur, 0) === 0 ? [nums] : [];
    const flag = {};
    const result = [];
    const map = {};
    nums.forEach((n, i) => map[n] ? map[n].push(i) : map[n] = [i]);
    for(let i = 0; i < nums.length - 2; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            const remain = 0 - nums[i] - nums[j];
            let key = nums[i] <= nums[j] ? `${nums[i]},${nums[j]}` : `${nums[j]},${nums[i]}`;
            if (flag[key]) continue;
            else flag[key] = true;
            if (map[remain] && map[remain].some(v => v > i && v > j)) {
                let r = [nums[i], nums[j], remain];
                r.sort((a, b) => a - b);
                let k = r.join(',');
                if (!flag[k]) {
                    flag[k] = true;
                    result.push(r);
                }
            }
        }
    }
    // console.log(JSON.stringify(result));
    return result;
};