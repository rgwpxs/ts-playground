/**
 * 125. 验证回文串
 */
function isPalindrome(s: string): boolean {
    if (!s?.length) return false;
    const compactStr = s.split('').filter(v => /[0-9a-zA-Z]/.test(v)).join('').toLowerCase();
    if(!s?.length) return false;
    for (let i = 0; i < Math.floor(compactStr.length); i++) {
        if (compactStr[i] !== compactStr[compactStr.length - i - 1]) return false;
    }
    return true;
};