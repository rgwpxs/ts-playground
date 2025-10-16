/**
 * 28. 找出字符串中第一个匹配项的下标
 */
function strStr(haystack: string, needle: string): number {
    for(let i = 0; i < haystack.length - needle.length + 1; i++) {
        if (haystack[i] !== needle[0]) continue;
        let allMatch = true;
        for (let j = 1; j < needle.length; j++) {
            if (haystack[i+j] !== needle[j]) {
                allMatch = false;
                continue;
            }
        }
        if (allMatch) return i;
    }
    return -1
};