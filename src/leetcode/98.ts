/**
 * 98. 验证二叉搜索树
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

function isValidBST(root: TreeNode | null): boolean {
    let arr = [];
    const inorder = (node: TreeNode | null) => {
        if (!node) return -1;
        inorder(node.left);
        arr.push(node.val);
        inorder(node.right);
    }
    inorder(root);
    for(let i = 1; i < arr.length; i++) {
        if (arr[i] <= arr[i - 1]) return false;
    }
    return true;
};