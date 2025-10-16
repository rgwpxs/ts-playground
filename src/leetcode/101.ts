/**
 * 101. 对称二叉树
 * 
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

function isSymmetric(root: TreeNode | null): boolean {
    if (!root) return true;
    const isEqual = (left, right): boolean => {
        if (left === null && right === null) return true;
        if(left?.val !== right?.val) return false;
        return isEqual(left.left, right.right) && isEqual(left.right, right.left);
    }
    return isEqual(root.left, root.right);
};