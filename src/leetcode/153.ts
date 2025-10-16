/**
 * 153. 寻找旋转排序数组中的最小值
 */
function findMin(nums: number[]): number {
    let s = 0, e = nums.length - 1, k = 0;
    while(e > s && nums[s] > nums[e]) {
        let m = s + Math.floor((e + 1 - s) / 2);
        let l = m - 1, r = m + 1;
        if (l >= 0 && nums[l] > nums[m]) {
            k = m;
            break;
        }
        if (r < nums.length && nums[m] > nums[r]) {
            k = r;
            break;
        }
        if (nums[l] < nums[s]) {
            e = l;
        } else if (nums[r] > nums[e]) {
            s = r;
        }
    }
    console.log(k);
    return nums[k];
};