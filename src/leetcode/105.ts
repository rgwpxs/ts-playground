/**
 * 105. 从前序和中序遍历序列构造二叉树
 * Definition for a binary tree node.

 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length !== inorder.length) return null;
    if (!preorder?.length) return null;
    if (preorder.length === 1) return new TreeNode(preorder[0]);
    const mid = inorder.indexOf(preorder[0]);
    const head = new TreeNode(preorder[0]);
    console.log('mid', mid, 'left-pre', preorder.slice(1, mid+1),'left-in',  inorder.slice(0, mid),'right-pre',  preorder.slice(mid + 1, preorder.length),'right-in',  inorder.slice(mid + 1, preorder.length));
    head.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    head.right = buildTree(preorder.slice(mid + 1, preorder.length), inorder.slice(mid + 1, preorder.length));
    return head;
};

buildTree([3,9,20,15,7], [9,3,15,20,7])
buildTree([1,2,3], [3,2,1])