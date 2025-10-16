/**
 * 
172. 阶乘后的零
中等
给定一个整数 n ，返回 n! 结果中尾随零的数量。

提示 n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1
 * 
 */

function trailingZeroes(n: number): number {
    let r = n, z = 0;
    for (let i = n-1; i > 0; i--) {
        if (i % 10 === 0) {
            r = r * (i/10);
            z++;
            console.log('i', i, r, z);
        } else if (r % 10 === 0) {
            r = (r / 10) * i;
            z++;
            console.log('r before', r, i, z);
        } else {
            r *= i;
        }
        if (r % 10 === 0) {
            z++;
            r /= 10;
            console.log('r after', r, i, z);
        }
        if (r > 1000000) {
            r = r % 1000000;
        }
    }
    return z;
};

// console.log(trailingZeroes(30));
console.log(trailingZeroes(625));
// console.log(trailingZeroes(0));
