/**
 * 68. 文本左右对齐
 * @param words 
 * @param maxWidth 
 * @returns 
 */
function fullJustify(words: string[], maxWidth: number): string[] {
    const result = [];
    let curLen = 0, curArr: string[] = [];
    for (let i = 0; i < words.length; i++) {
        const nextLen = curLen === 0 ? words[i].length : curLen + 1 + words[i].length;
        if (nextLen > maxWidth) {
            let blanks = maxWidth - curLen + curArr.length - 1;
            let nums = curArr.length - 1;
            let s = curArr[0];
            if (curArr.length === 1 && blanks) {
                s += Array.from({length: blanks}).map(g => ' ').join('');
            } else {
                for (let j = 1; j < curArr.length; j++) {
                    const gap = blanks % nums === 0 ? blanks / nums : (blanks > nums) ? Math.ceil(blanks / nums) : blanks;
                    s += Array.from({length: gap}).map(g => ' ').join('');
                    s += curArr[j];
                    blanks -= gap;
                    nums--;
                };
            }
            result.push(s);
            curArr = [words[i]];
            curLen = words[i].length;
        } else {
            curArr.push(words[i]);
            curLen = nextLen;
        }
    }
    if (curArr.length) {
        let s: string = curArr.join(' ');
        if (s.length < maxWidth) {
            s += Array.from({length: maxWidth - s.length}).map(g => ' ').join('');
        }
        result.push(s);
    }
    // console.log(JSON.stringify(result), JSON.stringify(result.map(it => it.length)));
    return result;
};

fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16);
fullJustify(["What","must","be","acknowledgment","shall","be"], 16);
fullJustify(["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], 20);