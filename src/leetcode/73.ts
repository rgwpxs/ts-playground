/**
 * 73. 矩阵置零
 */

/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    const zeros = [];
    const m = matrix.length, n = matrix?.[0]?.length;
    if (!m || !n) return;
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                zeros.push([i, j]);
            }
        }
    }
    const lim = Math.max(m, n);
    if (zeros.length) {
        zeros.forEach(v => {
            const [x, y] = v;
            for(let i = 0; i < lim; i++) {
                if (i < n) {
                    matrix[x][i] = 0;
                }
                if (i < m) {
                    matrix[i][y] = 0;
                }
            }
        })
    }
};