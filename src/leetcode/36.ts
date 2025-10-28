/**
 * 36. 有效的数独
 */

function isValidSudoku(board: string[][]): boolean {
    if (!board?.[0]?.length) return false;
    const cm = board[0].map((v, i) => ({}));
    for (let i = 0; i < board.length; i++) {
        const line = board[i];
        const lm = {};
        for (let j = 0; j < line.length; j++) {
            const cell = line[j] === '.' ? '' : line[j];
            if (cell && lm[cell] || (cell && cm[j][cell])) {
                // console.log('line/col', i, j, cell, lm[cell], cm[j][cell]);
                return false;
            }
            if (cell) {
                lm[cell] = 1;
                cm[j][cell] = 1;
            }
        }
    }
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            const bm = {};
            if ([board[i*3][j*3],
            board[i*3+1][j*3],
            board[i*3+2][j*3],
            board[i*3][j*3+1],
            board[i*3+1][j*3+1],
            board[i*3+2][j*3+1],
            board[i*3][j*3+2],
            board[i*3+1][j*3+2],
            board[i*3+2][j*3+2]].some(v => {
                if(v!=='.' && bm[v]) {
                    // console.log('block',i, j, v, JSON.stringify(bm));
                    return true;
                }
                if(v!=='.') {
                    bm[v] = 1;
                }
                return false
            })) return false;
        }
    }
    return true;
};