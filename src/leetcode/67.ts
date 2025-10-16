/**
 * 67. 二进制求和
 */

function addBinary(a: string, b: string): string {
    let increase = 0, len = Math.max(a.length, b.length);
    const m = {
        '0': 0,
        '1': 1
    }
    if (!len) return '';
    const result = [];
    for (let i = 0; i < len; i++) {
        const av = a[a.length - i - 1];
        const bv = b[b.length - i - 1];
        let remain = (m[av] || 0) + (m[bv] || 0) + increase;
        increase = 0;
        if (remain >= 2) {
            increase = 1;
            remain = remain % 2;
        }
        result[len - i - 1] = remain;
    }
    if (increase) {
        result.unshift(increase);
    }
    return result.join('');
};