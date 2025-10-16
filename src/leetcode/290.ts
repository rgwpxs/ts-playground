/**
 * 290. 单词规律
 */
function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(' ');
    if (pattern?.length !== words?.length) return false;
    const m1 = new Map();
    const m2 = new Map();
    for (let i = 0; i < pattern.length; i++) {
        const p = pattern[i];
        const w = words[i];
        if ((m1.has(p) && m1.get(p) !== w) || (m2.has(w) && m2.get(w) !== p)) return false;
        if (!m1.has(p)) m1.set(p, w);
        if (!m2.has(w)) m2.set(w, p);
    }
    return true;
};