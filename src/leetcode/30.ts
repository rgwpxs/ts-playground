/**
 * 30. 串联所有单词的子串
 */

function findSubstring(s: string, words: string[]): number[] {
    let len = words.length, step = words[0]?.length || 0, size = len * step;
    if (!len || !step || s.length < size) return [];
    const wordMap = {}, wordSet = new Set<string>(), result = [];
    words.forEach((w, i) => {
        wordMap[w] = (wordMap[w] || 0) + 1;
        wordSet.add(w);
    });
    let str = '';
    if (wordSet.size === 1) {
        str = words.join('');
    }
    const isSubString = (win) => {
        // console.log('win', JSON.stringify(win));
        if (str) return win.join('') === str;
        const cMap = {}, cSet = new Set<string>();
        let w = '';
        for (let i = 0; i < win.length; i++) {
            const pos = i % step;
            if (pos === step-1) {
                w = pos === 0 ? '' + win[i] : w + win[i];
                // console.log('w', w);
                if (!wordSet.has(w)) {
                    return false;
                } else {
                    cSet.add(w);
                    cMap[w] = (cMap[w] || 0) + 1;
                    if (cMap[w] > wordMap[w]) return false;
                }
            } else if (pos === 0) {
                w = '' + win[i];
            } else {
                w += win[i];
            }
        }
        // console.log(JSON.stringify(cMap), JSON.stringify(wordMap));

        if (cSet.size !== wordSet.size) return false;
        return Array.from(wordSet).every(w => cMap[w] === wordMap[w]);
    }
    let left = 0, right = 0, window = [];
    while(right < s.length) {
        window.push(s[right]);
        right++;
        while(window.length > size) {
            window.shift();
            left++;
        }
        if (window.length === size && isSubString(window)) {
            // console.log('--into--', left);
            result.push(left);
        }
    }
    return result;
};