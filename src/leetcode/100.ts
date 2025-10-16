/**
 * 100. 相同的树
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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === q) return true;
    if ((!p && q) || (p && !q)) {
        return false;
    }
    if (p.val !== q.val) return false;
    if ((p.left && !q.left) || (!p.left && q.left) || (p.right && !q.right) || (!p.right && q.right)) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};