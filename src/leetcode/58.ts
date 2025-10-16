/**
 * 58. 最后一个单词的长度
 */
function lengthOfLastWord(s: string): number {
    const trimedS = s.trim();
    const arr = s.split(' ').filter(w => w);
    return arr[arr.length - 1]?.length;
};