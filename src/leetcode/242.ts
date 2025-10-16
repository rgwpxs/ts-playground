/**
 * 242. 有效的字母异位词
 */

function isAnagram(s: string, t: string): boolean {
    if (s?.length !== t?.length) return false;
    const m = new Map();
    for (let i = 0; i < s.length; i++) {
        const w = s[i];
        if (m.has(w)) {
            m.set(w, m.get(w) + 1);
        } else {
            m.set(w, 1);
        }
    }
    for (let j = 0; j < t.length; j++) {
        const w = t[j];
        if (!m.has(w)) return false;
        const count = m.get(w) - 1;
        if (count) {
            m.set(w, count);
        } else {
            m.delete(w);
        }
    }
    return true;
};