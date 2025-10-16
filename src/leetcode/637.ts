/**
 * 637. 二叉树的层平均值
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

function averageOfLevels(root: TreeNode | null): number[] {
    if (!root) return [];
    let arr = [root], layers = [1], m = new Map();
    m.set(1, {
        sum: root.val,
        count: 1
    });
    for (let i = 0; i < arr.length; i++) {
        const n = arr[i];
        const l = layers[i];
        if (n?.left && n?.right) {
            layers[arr.length] = l + 1;
            layers[arr.length + 1] = l + 1;
            arr.push(n.left);
            arr.push(n.right);
            if (m.has(l + 1)) {
                const original = m.get(l + 1);
                m.set(l + 1, {
                    sum: original.sum + n.left.val + n.right.val,
                    count: original.count + 2
                })
            } else {
                m.set(l + 1, {
                    sum: n.left.val + n.right.val,
                    count: 2
                })
            }
        } else if (n?.left || n?.right) {
            layers[arr.length] = l + 1;
            arr.push(n.left || n.right);
            if (m.has(l + 1)) {
                const original = m.get(l + 1);
                m.set(l + 1, {
                    sum: original.sum + (n.left?.val || n.right?.val || 0),
                    count: original.count + 1
                })
            } else {
                m.set(l + 1, {
                    sum: (n.left?.val || n.right?.val || 0),
                    count: 1
                })
            }
        }
    }
    return Array.from(m).map(it => (it[1].sum / it[1].count));
};