/** 76. 最小覆盖子串
 * 给定两个字符串 s 和 t，长度分别是 m 和 n，返回 s 中的 最短窗口子串，
 * 使得该子串包含 t 中的每一个字符（包括重复字符）。
 * 如果没有这样的子串，返回空字符串 ""。 测试用例保证答案唯一。
 * @param s 
 * @param t 
 */
function minWindow(s: string, t: string): string {
    const m = s.length, n = t.length;
    if (m < n) return '';
    const sm = {}, tm = {};
    const keys = Array.from(new Set(t.split('')));
    // init sm and tm
    for(let i = 0; i < n; i++) {
        let c = t[i];
        if (tm[c]) {
            tm[c]++;
        } else {
            tm[c] = 1;
        }
        c = s[i];
        if (sm[c]) {
            sm[c]++;
        } else {
            sm[c] = 1;
        }
    }
    const compare = () => {
        for (let k of keys) {
            if (!sm[k] || sm[k] < tm[k]) return false;
        }
        return true;
    }
    if (compare()) return s.split('').slice(0, n).join('');
    let min = m + 1, l = 0, result = [];
    for (let i = n; i < m; i++) {
        let c = s[i];
        if (tm[c]) {
            if (sm[c]) {
                sm[c]++;
            } else {
                sm[c] = 1;
            }
            if (tm[c] !== sm[c]) continue;
        }
        let len, flag = false;
        while(compare()) {
            flag = true;
            len = i - l + 1;
            sm[s[l]]--;
            l++;
        }
        if (flag && len < min) {
            min = len;
            result.push(s.split('').slice(l-1, i + 1).join(''));
        }
    }
    return result[result.length - 1] || '';
};

let s = "ADOBECODEBANC", t = 'ABC';

console.log(minWindow(s, t));
