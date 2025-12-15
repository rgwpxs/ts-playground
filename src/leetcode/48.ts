/**
 48. 旋转图像
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    const layer = Math.floor(matrix.length / 2); 
    for(let l = 0; l < layer; l++) {
        const s = l, e = matrix.length - l - 1;
        const arr1 = [], arr2 = [], arr3 = [], arr4 = [];
        for(let i = s; i <= e; i++) {
            arr1.push(matrix[s][i]);
            arr2.push(matrix[e-i+s][e]);
            arr3.push(matrix[e][i]);
            arr4.push(matrix[e-i+s][s]);
        }
        // console.log(JSON.stringify(arr1), JSON.stringify(arr2), JSON.stringify(arr3), JSON.stringify(arr4));
        for(let i = s; i <= e; i++){
            matrix[s][i] = arr4[i-s];
            matrix[i][e] = arr1[i-s];
            matrix[e][i] = arr2[i-s];
            matrix[i][s] = arr3[i-s];
        }
    }
};