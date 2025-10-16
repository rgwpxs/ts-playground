/**
 * 33. 搜索旋转排序数组
 */

function search(nums: number[], target: number): number {
    if (nums.length < 2) return nums[0] === target ? 0 : -1;
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

    const find = (si, ei) => {
        console.log('s', si, 'e', ei, nums[si], nums[ei]);
        if (si >= ei) return nums[ei] === target ? ei : -1;
        const m = si + Math.floor((ei + 1 - si) / 2);
        console.log('m', m, nums[m]);
        if (nums[si] === target) return si;
        if (nums[ei] === target) return ei;
        if (nums[m] === target) return m;

        if (target > nums[m]) {
            return find(m + 1, ei - 1);
        } else {
            return find(si + 1, m - 1);
        }
    }
    if (k === 0) {
        return find(0, nums.length - 1);
    } else if (target > nums[nums.length - 1]) {
        return find(0, k - 1);
    } else {
        return find(k, nums.length - 1);
    }
};