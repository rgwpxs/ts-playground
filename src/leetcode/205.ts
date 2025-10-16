/**
 * 205. 同构字符串
 */

function isIsomorphic(s: string, t: string): boolean {
    if (s?.length !== t?.length) return false;
    const amap = new Map();
    const bmap = new Map();
    for (let i = 0; i < s.length; i++) {
        const a = s[i];
        const b = t[i];
        if (amap.has(a) && amap.get(a) !== b) {
            return false;
        }
        if (bmap.has(b) && bmap.get(b) !== a) {
            return false;
        }
        if (!amap.has(a)) {
            amap.set(a, b);
        }
        if (!bmap.has(b)) {
            bmap.set(b, a);
        }
    }
    return true;
};