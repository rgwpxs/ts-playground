/**
 * 50. Pow(x, n)
 */

function myPow(x: number, n: number): number {
    if (x === 0) return 0;
    if (x === 1) return 1;
    if (x === -1) return n % 2 === 0 ? 1 : -1;
    if (n === 0) return 1;
    if (n === 1) return x;
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let r = x
    for(let i = 2; i <= n; i++) {
        r *= x;
        if (Math.abs(r) < 0.000001) {
            return 0;
        }
    }
    return r;
};