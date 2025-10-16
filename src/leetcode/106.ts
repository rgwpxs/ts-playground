/**
 * 106. 从中序和后序遍历序列构造二叉树
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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (inorder?.length !== postorder?.length || !inorder.length) return null;
    if (inorder.length === 1) { return new TreeNode(inorder[0]); }
    const headVal = postorder[inorder.length - 1];
    const head = new TreeNode(headVal);
    const mid = inorder.indexOf(headVal);
    console.log('mid', mid, 'left-in', inorder.slice(0, mid), 'left-post', postorder.slice(0, mid), 'right-in',inorder.slice(mid + 1, inorder.length) , 'right-post',postorder.slice(mid, postorder.length - 1) )
    head.left = buildTree(inorder.slice(0, mid), postorder.slice(0, mid));
    head.right = buildTree(inorder.slice(mid + 1, inorder.length), postorder.slice(mid, postorder.length - 1));
    return head;
};

buildTree([9,3,15,20,7], [9,15,7,20,3])
// buildTree([1,2,3], [3,2,1])