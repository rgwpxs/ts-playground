/**
 * 114. 二叉树展开为链表
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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
    let arr = [];
    const travel = (n: TreeNode | null) => {
        if (!n) return null;
        arr.push(n)
        if (n.left) travel(n.left);
        if (n.right) travel(n.right);
    }
    travel(root);
    for(let i = 0; i < arr.length - 1; i++) {
        arr[i].right = arr[i + 1];
        arr[i].left = null;
    }
};