/**
 * 45. 跳跃游戏 II
 * @param nums 
 * @returns 
 */
function jump(nums: number[]): number {
    if (nums?.length < 2) return 0;
    // construct the initial steps for which you can reach from pos-0
    const start = Array.from({length: nums[0]}).map((val, idx) => idx+1); 
    // 到达第i个num的最小步长
    const steps = Array.from({length: nums.length}).map(v => Infinity);
    steps[0] = 0;   // 0标位置跳0次
    start.forEach(v => steps[v] = 1);   // 起始数组中位置最小步长均为1
    const flags = start.map(v => true);
    const routes = [...start];
    for(let i = 0; i < routes.length; i++) {
        const pos = routes[i];  // nums中的某个位置
        const val = nums[pos];  // 当前位置可以跳多远
        for (let j = 1; j <= val; j++) {
            // 一步步往前跳，看看能跳到哪个位置
            const target = pos + j;
            steps[target] = Math.min(steps[target], steps[pos] + 1);
            if (!flags[target]) {
                routes.push(target);
                flags[target] = true;
            }
        }
    }
    return steps[nums.length - 1] || 0;
};