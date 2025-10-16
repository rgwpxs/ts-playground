/**
 * 117. 填充每个节点的下一个右侧节点指针 II
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 * 
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */


function connect(root: _Node | null): _Node | null {
    // 重点和难点：什么决定了一个节点是当前layer最后一个节点？
    // 怎么记录层次信息？
    let last = root, arr = [root], idx = 0, layer = [0];
    while(idx < arr.length) {
        let n = arr[idx];
        const l = n?.left;
        const r = n?.right;
        const nextLayer = layer[idx] + 1;
        if (l && r) {
            // l.next = r;
            layer[arr.length] = nextLayer;
            layer[arr.length + 1] = nextLayer;
            arr.push(l, r);
        } else if (l) {
            layer[arr.length] = nextLayer;
            arr.push(l);
        } else if (r) {
            layer[arr.length] = nextLayer;
            arr.push(r);
        }
        idx++
    }
    for (let i = 1; i < arr.length; i++) {
        const al = layer[i - 1];
        const bl = layer[i];
        if (al === bl) {
            arr[i - 1].next = arr[i];
        }
    }
    return root;
};