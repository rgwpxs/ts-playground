/**
 * 35. 搜索插入位置
 * @param nums 
 * @param target 
 * @returns 
 */
function searchInsert(nums: number[], target: number): number {
    let pos = -1;
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] >= target) {
            pos = i;
            break;
        }
    }
    if (pos === -1) {
        pos = nums.length;
    }
    return pos;
};