/**
 * 49. 字母异位词分组
 */
function groupAnagrams(strs: string[]): string[][] {
    const alph = {};
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'].forEach((v, i) => alph[v] = i);
    const m = new Map();
    for (let i = 0; i < strs.length; i++) {
        const w = strs[i].split('').sort((a, b) => alph[a] - alph[b]).join('');
        if (m.has(w)) {
            m.get(w).push(strs[i])
        } else {
            m.set(w, [strs[i]])
        }
    }
    return Array.from(m).map(it => it[1]);
};