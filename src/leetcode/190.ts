/**
 * 190. 颠倒二进制位
 * @param n 
 * @returns 
 */
function reverseBits(n: number): number {
    let pos = [], r = n;
    for(let i = 31; i > 0; i--) {
        const base = Math.pow(2, i);
        const v = Math.floor(r / base);
        pos[i] = v;
        r = r % base;
    }
    pos[0] = 0;
    let result = 0;
    for (let i = 0; i < 32; i++) {
        const base = Math.pow(2, 31 - i);
        result += pos[i] * base;
    }
    return result;
};