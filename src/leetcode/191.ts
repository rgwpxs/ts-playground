/**
 * 191. 位1的个数
 */

function hammingWeight(n: number): number {
    let result = 0, remains = n;
    for (let i = 31; i >= 0; i--) {
        const base = Math.pow(2, i);
        const v = Math.floor(remains / base);
        if (v) result++;
        remains = remains % base;
    }
    return result;
};