/**
 * 4. 寻找两个正序数组的中位数
 */

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const len = nums1.length + nums2.length;
    const count = len % 2 ? 1 : 2;
    let end = Math.floor(len / 2) + 1;

    const merge = [];
    let i = 0, j = 0;
    
    while (merge.length <= end) {
        if (nums2[j] === undefined || nums1[i] <= nums2[j]) {
            merge.push(nums1[i]);
            i++
        } else {
            merge.push(nums2[j]);
            j++;
        }
    }
    if (count === 2) {
        return (merge[end - 1] + merge[end - 2]) / 2;
    } else {
        return merge[end - 1];
    }
};