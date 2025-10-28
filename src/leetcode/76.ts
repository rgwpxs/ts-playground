
/***
 * 76. 最小覆盖子串
*/
function minWindow(s: string, t: string): string {
    if (t.length > s.length || !t.length || !s.length) return '';
    if (s.indexOf(t) > -1) return t;

    // if (t.length === s.length) return t === s ? s : '';
    const wordMap = {}, wordSet = new Set<string>();
    for(let i = 0; i < t.length; i++) {
        const v = t[i];
        wordSet.add(v);
        wordMap[v] = wordMap[v] ? wordMap[v] + 1 : 1;
    }
    const wordArr: string[] = Array.from(wordSet);
    console.log(JSON.stringify(wordArr), JSON.stringify(wordMap));
    const winMap = {}, winSet = new Set<string>();
    const covered = (nm) => {
        // console.log(JSON.stringify(nm));
        return wordArr.every((w) => {
            return wordMap[w] <= nm[w]
        })
    }
    let left = 0, right = 0, window = [], result, len = Infinity;
    while(right < s.length) {
        // 向窗口添加值
        const rVal = s[right];
        window.push(rVal);
        winMap[rVal] = winMap[rVal] ? winMap[rVal] + 1 : 1;
        winSet.add(rVal);
        right++;
        let res;
        while(covered(winMap)) {
            res = [...window];
            // 缩减窗口
            const lVal = s[left];
            window.shift();
            winMap[lVal] = winMap[lVal] ? winMap[lVal] - 1 : 0;
            left++;
        }
        if (res?.length) {
            const rl = res.join('');
            console.log('-----res-----', rl.length);
            if (rl.length < len) {
                len = rl.length;
                result = rl;
            }
        } else if (winSet.size === 1) {
            const c = Array.from(winSet)[0];
            while(winMap[c] > (wordMap[c] || 0)) {
                window.shift();
                winMap[c] = winMap[c] - 1;
                left++;
            }
            // console.log(c, winMap[c], wordMap[c], left, window.length);
        }
    }

    return result || '';
};

