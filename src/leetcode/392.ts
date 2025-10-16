/**
 * 392. 判断子序列
 */

function isSubsequence(s: string, t: string): boolean {
    if (!s?.length) return true;
    let lastIndex = t.indexOf(s[0]);
    if (lastIndex === -1) return false;
    for(let i = 1; i < s.length; i++) {
        let foundMatch = false;
        for(let j = lastIndex + 1; j < t.length; j++) {
            if (s[i] === t[j]) {
                foundMatch = true;
                lastIndex = j;
                break;
            }
        }
        if (!foundMatch) return false;
    }
    return true;
};