/**
 * 529. 扫雷游戏
 */

function updateBoard(board: string[][], click: number[]): string[][] {
    let x = click[0], y = click[1];
    if (board[x][y] === 'M') {
        board[x][y] = 'X';
        return board;
    } else if (board[x][y] === 'E') {
        const checkValid = (a, b) => {
            if (a < 0 || b < 0 || a >= board.length || b >= board[0].length) return false;
            return true;
        }
        const checkBomb = (a, b) => {
            const valid = checkValid(a,b);
            if (!valid) return false;
            if (board[a][b] === 'M') return true;
            return false;
        }
        const neighbours = [[x-1, y-1], [x-1, y], [x-1, y+1], [x+1, y-1],
                             [x+1, y], [x+1, y+1], [x, y-1], [x, y+1]];
        // case B
        const bombs = neighbours.filter(n => checkBomb(n[0], n[1]));
        if (bombs.length) {
            board[x][y] = '' + bombs.length;
        } else {
            board[x][y] = 'B';
            neighbours
              .filter(pos => checkValid(pos[0], pos[1]) && board[pos[0]][pos[1]] === 'E').forEach(pos => updateBoard(board, pos));
        }
        return board;
    }
    return board;
};

