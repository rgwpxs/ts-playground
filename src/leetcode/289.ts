/**
 * 289. 生命游戏
 */

/**
 Do not return anything, modify board in-place instead.
 */
function gameOfLife(board: number[][]): void {
    const m = board?.length || 0, n = board?.[0]?.length;
    if (!m || !n) return;
    const records = [];
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            const neighbors = [[i, j-1], [i, j+1], [i+1, j], [i-1, j], [i-1, j-1], [i-1, j+1], [i+1, j-1], [i+1, j+1]].filter(v => v[0] > -1 && v[0] < m && v[1] > -1 && v[1] < n);
            let lives = 0, death = 0;
            neighbors.forEach(v => {
                const cell = board[v[0]][v[1]];
                if (cell === 0) death++;
                else lives++;
            });
            const it = board[i][j];
            if (it === 1 && (lives < 2 || lives > 3)) {
                records.push([i, j])
            } else if (it === 0 && lives === 3) {
                records.push([i, j])
            }
        }
    }
    if (records.length) {
        records.forEach(v => {
            const [x, y] = v;
            board[x][y] = !board[x][y] ? 1 : 0;
        })
    }
};