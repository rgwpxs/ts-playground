/**
 * 236. 二叉树的最近公共祖先
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 找祖先序列 javascript
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (!root || !p || !q) return null;
    if (root === p || root === q) return root;
    let count = 0;
    const addPre = (node) => {
        if (!node) return;
        if (node.left) {
            node.left.pre = node;
            if (node.left === p || node.left === q) {
                count++;
                if (count === 2) {
                    return;
                }
            }
            addPre(node.left);
        }
        if (node.right) {
            node.right.pre = node;
            if (node.right === p || node.right === q) {
                count++;
                if (count === 2) {
                    return;
                }
            }
            addPre(node.right);
        }
    }
    addPre(root);
    let pr = [], qr = [];
    let cp = p, cq = q;
    while(cp.pre) {
        if (cp.pre === q) {
            return q;
        }
        pr.unshift(cp.pre);
        prv.unshift(cp.pre.val);
        cp = cp.pre;
    }
    while(cq.pre) {
        if (cq.pre === p) {
            return p;
        }
        if (pr.some(v => v === cq.pre)) {
            return cq.pre
        }
        cq = cq.pre;
    }
};

/**
 * 理清思路，直接递归
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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
};
