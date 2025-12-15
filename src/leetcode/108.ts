/**
 * 108. 将有序数组转换为二叉树
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (!nums?.length) return null;
    const createTree = (s, e): TreeNode | null => {
        if (s>e) return null;
        const m = Math.floor((s+e) / 2);
        const root = new TreeNode(nums[m]);
        let l = m - 1, r = m + 1;
        if (l >= 0) {
            root.left = createTree(s, l);
        }
        if (r < nums.length) {
            root.right = createTree(r, e)
        }
        return root;
    }
    
    return createTree(0, nums.length - 1);
};