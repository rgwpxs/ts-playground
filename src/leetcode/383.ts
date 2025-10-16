/**
 * 383. 赎金信
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
    let wordMap = new Map();
    for(let i = 0; i < magazine.length; i++) {
        const w = magazine[i];
        if (wordMap.has(w)) {
            wordMap.set(w, wordMap.get(w) + 1);
        } else {
            wordMap.set(w, 1);
        }
    }
    for(let j = 0; j < ransomNote.length; j++) {
        const w = ransomNote[j];
        if (wordMap.has(w)) {
            const remains = wordMap.get(w) - 1;
            if (remains) {
                wordMap.set(w, remains); 
            } else {
                wordMap.delete(w);
            }
        } else {
            return false;
        }
    }
    return true;
};