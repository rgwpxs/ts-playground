/** 
 * 103. 二叉树的锯齿形层序遍历
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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    const arr = [root], layer = [0], result = [[root.val]];
    for(let i = 0; i < arr.length; i++) {
        const n = arr[i];
        const nl = layer[i] + 1;
        let ni = arr.length;
        if(n.left) {
            layer[ni] = nl;
            ni++
            arr.push(n.left);
            if (result[nl]) {
                if (nl % 2 === 1) {
                    result[nl].unshift(n.left.val);
                } else {
                    result[nl].push(n.left.val);
                }
            } else {
                result[nl] = [n.left.val];
            }
        }
        if(n.right) {
            layer[ni] = nl;
            arr.push(n.right);
            if (result[nl]) {
                if (nl % 2 === 1) {
                    result[nl].unshift(n.right.val);
                } else {
                    result[nl].push(n.right.val);
                }
            } else {
                result[nl] = [n.right.val];
            }
        }
    }
    return result;
};