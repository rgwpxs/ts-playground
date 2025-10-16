/**
 * 14. 最长公共前缀
 */
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    if (strs.length === 1) return strs[0];
    let result = [''], pre = '';
    strs.sort((a, b) => a.length - b.length);
    let s = strs[0];
    for(let i = 0; i < s.length; i++) {
        pre = pre + s[i];
        let allMatch = true;
        for (let j = 1; j < strs.length; j++) {
            if (strs[j].indexOf(pre) !== 0) {
                allMatch = false;
                break;
            }
        }
        if (allMatch) result.push(pre);
    }
    return result[result.length - 1];
};