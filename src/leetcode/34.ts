/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * @param nums 
 * @param target 
 * @returns 
 */
function searchRange(nums: number[], target: number): number[] {
    let m = Math.floor(nums.length / 2);
    const binarySearch = (s, e) => {
        // console.log('s', s, 'e', e);
        if (s >= e) return nums[e] === target ? e : -1;
        let m = Math.floor((e - s + 1) / 2);
        // console.log('s+m', s+m);
        if (nums[s+m] === target) {
            return s+m;
        } else if (target > nums[s+m]) {
            return binarySearch(s + m + 1, e);
        } else {
            return binarySearch(s, s + m - 1);
        }
    }
    const k = binarySearch(0, nums.length - 1);
    console.log('k', k);
    if (k === -1) {
        return [-1, -1];
    }
    let i = 1, j = 1;
    while((k + j) < nums.length && nums[k + j] === target) {
        j++;
    }
    while ((k - i) >= 0 && nums[k - i] === target) {
        i++;
    }
    return [k - i + 1, k + j - 1]
};