/**
 * 104. 二叉树的最大深度
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

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    
    const cb = (node: TreeNode): number => {
        if (!node) return 0;
        let l = node.left;
        let r = node.right;
        return 1 + Math.max(cb(l), cb(r));
    }
    return cb(root);
};