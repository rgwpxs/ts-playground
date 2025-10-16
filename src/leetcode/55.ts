/**
 * 55 跳跃游戏
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 * @param nums 
 * @returns 
 */
function canJump(nums: number[]): boolean {
    let jump = nums[0];
    let steps = [], s = new Set();
    let nextIndex = 0;
    if (jump + 1 >= nums.length) return true;
    for (let i = 0; i < jump; i++) {
        steps.push(i + 1);
        console.log('new step', i+1);
        s.add(i + 1);
    }
    for (let j = 0; j < steps.length; j++) {
        const bigJump = steps[j] + nums[steps[j]] + 1;
        if (bigJump >= nums.length) {
            console.log(`j ${j}, steps[j] ${steps[j]}, num ${nums[steps[j]]}, bigJump ${bigJump}`);
            return true;
        }
        if (nums[steps[j]] === 0) continue;
        Array.from({length: nums[steps[j]]}).forEach((it, index) => {
            const n = steps[j] + index + 1;
            if (!s.has(n)) {
                console.log('new step', n, j, steps[j], index);
                steps.push(n);
                s.add(n)
            }
        })
    }
    return false;
};

console.log(canJump([2,3,1,1,4])) // true
console.log(canJump([3,2,1,0,4])) // false
console.log(canJump([1,2,3])) // true
console.log(canJump([1,1,1,0])) // true


// BFS
/**
 * 55 跳跃游戏
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 * @param nums 
 * @returns 
 */
function canJump(nums: number[]): boolean {
    if (nums.length < 2) return true;
    const starter = Array.from({length: nums[0]}).map((v, i) => i + 1);
    let flag = [];
    starter.forEach(s => flag[s] = true);
    // console.log('starter', JSON.stringify(starter));
    if (flag[nums.length - 1]) return true;
    const steps = [...starter];
    for (let i = 0; i < steps.length; i++) {
        const pos = steps[i];
        const val = nums[pos];
        for (let j = 1; j <= val; j++) {
            const next = pos + j;
            // console.log('next', next);
            if (next === nums.length-1) return true;
            else if (!flag[next]) { steps.push(next); flag[next] = true; }
        }
    }
    // console.log('steps', JSON.stringify(steps), 'flags', JSON.stringify(flag));
    return flag[nums.length - 1] || false;
};