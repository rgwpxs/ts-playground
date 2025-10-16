/**
 * 230. 二叉搜索树中第 K 小的元素
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

function kthSmallest(root: TreeNode | null, k: number): number {
    const arr = [];
    const inorder = (node: TreeNode | null) => {
        if (!node) return -1;
        inorder(node.left);
        arr.push(node.val);
        inorder(node.right);
    }
    inorder(root);
    if (k > arr.length) return -1;
    return arr[k - 1];
};