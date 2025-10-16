/**
 * 200. 岛屿数量
 */

function numIslands(grid: string[][]): number {
    const m = grid.length, n = grid[0].length;
    let result = 0, flag = '3', first = -1;
    const bfs = (i, j) => {
        // console.log('bfs', i, j);
        if (i >= grid.length || j >= grid[i].length) return;
        let k = i, t = j, queue = [[i, j]];
        for (let t = 0; t < queue.length; t++) {
            const [a, b] = queue[t];
            [[a, b-1], [a-1, b], [a, b+1], [a+1, b]].filter(it => (
                it[0] >= 0 && it[0] < m && it[1] >= 0 && it[1] < n
            )).forEach(it => {
                if (grid[it[0]][it[1]] === '1') {
                    // console.log('add', it[0], it[1]);
                    grid[it[0]][it[1]] = flag;
                    queue.push([it[0], it[1]]);
                }
            })
        }
    }
    for (let a = 0; a < m; a++) {
        for (let b = 0; b < n; b++) {
            if (grid[a][b] === '1') {
                // console.log('-- found --', a, b);
                result++;
                grid[a][b] = flag
                bfs(a, b);
            }
        }
    }
    // console.log(JSON.stringify(grid));
    return result;
};