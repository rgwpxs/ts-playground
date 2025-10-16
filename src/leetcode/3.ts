/**
 * 3. 无重复字符的最长子串
 */
function lengthOfLongestSubstring(s: string): number {
    if (!s || !s.length) return 0;
    let last = [s[0]], dp = [1];
    let max = 1;
    // 动态规划
    // 定义dp子结构：dp[n] = dp[n-1] + dp[1] 指的是以n为结尾的最长无重复字符子串
    for (let i = 1; i < s.length; i++) {
        if (last.indexOf(s[i]) === -1) {
            last.push(s[i]);
            dp[i] = dp[i - 1] + 1;
            if (dp[i] > max) max = dp[i];
        } else {
            last = last.join('').split(s[i])[1].split('');
            last.push(s[i]);
            dp[i] = last.length;
        }
    }
    return max;
};