/**
 * 130. 被围绕的区域
 */

function solve(board: string[][]): void {
    if (board.length < 3) return;
    const m = board.length;
    const n = board[0].length;
    const bfs = (a, b) => {
        let revert = false, queue = [[a, b]];
        for(let i = 0; i < queue.length; i++) {
            const [c, d] = queue[i];
            const neighbors = [[c-1, d], [c, d+1], [c+1, d], [c, d-1]].filter(
                p => (p[0] >= 0 && p[0] < m && p[1] >= 0 && p[1] < n)
            );
            for(let l = 0; l < neighbors.length; l++) {
                const [k, t] = neighbors[l];
                if (board[k][t] === 'O' && (k === 0 || k === m-1 || t === 0 || t === n-1)) {
                    revert = true;
                    break;
                } else if (board[k][t] === 'O') {
                    board[k][t] = 'X';
                    queue.push([k, t]);
                }
            }
        }
        if (revert) {
            queue.forEach(p => board[p[0]][p[1]] = 'O')
        }
    }
    for(let i = 1; i < m - 1; i++) {
        for(let j = 1; j < n -1; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X'
                bfs(i, j);
            }
        }
    }
};