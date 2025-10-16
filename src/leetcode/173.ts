/**
 * 173. 二叉搜索树迭代器
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

class BSTIterator {
    private arr = [];
    private idx = 0;
    constructor(root: TreeNode | null) {
        this.idx = 0;
        const inorder = (node: TreeNode | null) => {
            if (!node) return;
            inorder(node.left);
            this.arr.push(node.val);
            inorder(node.right);
        }
        inorder(root);
    }

    next(): number {
        if (this.hasNext()) {
            this.idx++
            return this.arr[this.idx - 1];
        }
    }

    hasNext(): boolean {
        if (this.arr.length === this.idx) {
            return false;
        }
        return true;
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */