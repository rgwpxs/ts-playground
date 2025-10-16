/**
 * 74. 搜索二维矩阵
 */
function searchMatrix(matrix: number[][], target: number): boolean {
    let m = matrix?.length, n = matrix[0]?.length;
    if (m === 1) {
        if (matrix[0][n - 1] < target) return false;
        for (let i = 0; i < n; i++) {
            if (matrix[0][i] === target) {
                return true;
            }
        }
        return false;
    }
    for (let i = 1; i < m; i++) {
        const first = matrix[i][0];
        if (first === target) return true;
        if (first > target) {
            for (let j = 0; j < n; j++) {
                if (matrix[i-1][j] === target) {
                    return true;
                }
            }
            return false;
        } else if (i === m-1){
            for(let j = 1; j < n; j++) {
                if (matrix[i][j] === target) {
                    return true;
                }
            }
            return false;
        }
    }
    return false;
};