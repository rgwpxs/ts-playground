/**
 * 199. 二叉树的右视图
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

function rightSideView(root: TreeNode | null): number[] {
    if (!root) return [];
    let arr = [root], layer = [1], map = new Map([[1, [root.val]]]);
    for(let i = 0; i < arr.length; i++) {
        const n = arr[i];
        const nl = layer[i] + 1;
        let ni = arr.length;
        if (n.left) {
            layer[ni] = nl;
            if (map.has(nl)) {
                map.get(nl).push(n.left.val);
            } else {
                map.set(nl, [n.left.val]);
            }
            arr.push(n.left);
            ni++
        }
        if (n.right) {
            layer[ni] = nl;
            if (map.has(nl)) {
                map.get(nl).push(n.right.val);
            } else {
                map.set(nl, [n.right.val]);
            }
            arr.push(n.right);
        }
    }
    return Array.from(map).map((v) => v[1][v[1].length - 1]);
};