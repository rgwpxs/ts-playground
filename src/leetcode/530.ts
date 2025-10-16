/**
 * 530. 二叉搜索树的最小绝对差
 */

/**
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

function getMinimumDifference(root: TreeNode | null): number {
    if (!root) return 0;
    let arr = [];
    const inorder = (node: TreeNode | null) => {
        if (!node) return -1;
        inorder(node.left);
        arr.push(node.val);
        inorder(node.right);
    }
    inorder(root);
    arr = arr.filter(v => v !== -1);
    if (arr.length === 1) return 0;
    let min = arr[arr.length - 1];
    for (let i = 1; i < arr.length; i++) {
        const nm = Math.abs(arr[i] - arr[i - 1]);
        min = Math.min(min, nm);
    }
    return min;
};