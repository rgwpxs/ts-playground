/**
 * 133. 克隆图
 */
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 * 
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 * 
 */


function cloneGraph(node: _Node | null): _Node | null {
    if (!node) return null;
    const visited = {};
	const cloneNode = (root: _Node) => {
        const res = new _Node(root.val);
        visited[root.val] = res;
        if (root.neighbors?.length) {
            res.neighbors = [];
            root.neighbors.forEach(n => {
                const v = n.val;
                if (visited[v]) {
                    res.neighbors.push(visited[v]);
                } else {
                    res.neighbors.push(cloneNode(n));
                }
            })
        }
        return res;
    }
    return cloneNode(node);
};