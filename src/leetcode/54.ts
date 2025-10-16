/**
 * 54. 螺旋矩阵
 */

function spiralOrder(matrix: number[][]): number[] {
    let x = 0, y = 0, r = [], visited = [];
    const m = matrix.length, n = matrix[0]?.length, len = m * n;
    // 记录方向['r', 'd', 'l', 'u'] 更新方向时使用 d = (d + 1) % 4
    let d = 0;
    while(r.length < len) {
        // console.log(`x: ${x}, y: ${y}, d: ${d}`);
        if (!visited[x]) {
            visited[x] = [];
        }
        if (!visited[x][y]) {
            r.push(matrix[x][y]);
        }
        visited[x][y] = 1;
        switch(d) {
            case 0:
                if (y + 1 >= n || visited[x][y+1]) {
                    d = (d + 1) % 4;
                } else {
                    y = y + 1;
                }
                break;
            case 1:
                if (x + 1 >= m || (visited[x+1] && visited[x+1][y])) {
                    d = (d + 1) % 4;
                    
                }  else {
                    x = x + 1;
                }
                break;
            case 2:
                if (y - 1 < 0 || visited[x][y-1]) {
                    d = (d + 1) % 4;
                } else {
                    y = y - 1;
                }
                break;
            case 3:
                if (x - 1 < 0 || visited[x-1][y]) {
                    d = (d + 1) % 4;
                } else {
                    x = x - 1;
                }
                break;
        }
    }
    return r;
};