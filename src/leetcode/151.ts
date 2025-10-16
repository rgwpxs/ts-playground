/**
 * 151. 反转字符串中的单词
 * @param s 
 * @returns 
 */
function reverseWords(s: string): string {
    const source = s.split(' ').filter(v => !!v);
    if (!source?.length) return '';
    const target = [];
    for(let i = source.length - 1; i >= 0; i--) {
        target.push(source[i]);
    }
    return target.join(' ');
};