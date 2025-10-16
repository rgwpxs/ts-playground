/**
 * 127. 单词接龙
 */

function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    if (wordList.indexOf(endWord) === -1) return 0;
    const compareTwoWords = (w1, w2) => {
        let count = 0;
        for (let i = 0; i < w1.length; i++) {
            if (w1[i] !== w2[i]) count++;
        }
        return count === 1;
    }
    let last = beginWord, i = 0;
    let starter = [];
    // init the next/starter queue
    while (i < wordList.length) {
        if (compareTwoWords(last, wordList[i])) {
            if (wordList[i] === endWord) return 2;
            starter.push(i);
        }
        i++;
    }
    i = 0;
    console.log('starter', JSON.stringify(starter));
    let next = [...starter];
    // let seq = [[...starter]];
    let levels = {};
    starter.forEach(it => {levels[it] = 2});
    console.log('levels', JSON.stringify(levels));
    let flag = next.map(it => false);
    let len = Infinity;
    while (i < next.length) {
        let matched = false;
        const nextIdx = next[i];
        // let level = seq.findIndex(it => it.indexOf(nextIdx) > -1);
        // console.log('level', level);
        const last = wordList[nextIdx];
        for (let j = 0; j < wordList.length; j++) {
            if (typeof levels[j] !== 'undefined') continue;
            if (compareTwoWords(last, wordList[j])) {
                levels[j] = levels[nextIdx] + 1;
                console.log('nextIdx', nextIdx, 'level[nextIdx]', levels[nextIdx], 'j', j, 'level[j]', levels[j]);
                matched = true;
                if (wordList[j] !== endWord) {
                    next.push(j)
                    console.log(next.length);
                } else {
                    flag[i] = true;
                    len = Math.min(levels[j], len);
                }
            }
        }
        i++
    }
    console.log('flag', JSON.stringify(flag), 'levels', JSON.stringify(levels), 'next', JSON.stringify(next), 'len', len);
    if (flag.some(it => it)) {
        return len;
    }
    return 0;
};