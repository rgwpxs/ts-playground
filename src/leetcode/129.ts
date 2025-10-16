/**
 * 129. 求根节点到叶节点数字之和
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

function sumNumbers(root: TreeNode | null): number {
    let arr = [];
    const traval = (n: TreeNode | null, acc: string) => {
        if (!n.left && !n.right) {
            arr.push(acc + n.val);
        }
        if (n.left) {
            traval(n.left, acc + n.val);
        }
        if (n.right) {
            traval(n.right, acc + n.val);
        }
    }
    traval(root, '');
    return arr.map(it => parseInt(it)).reduce((acc, cur) => acc + cur, 0);
};