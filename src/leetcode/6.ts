/**
 * 6. Z字形变换
 * @param s 
 * @param numRows 
 * @returns 
 */
function convert(s: string, numRows: number): string {
    if ((s?.length || 0) <= numRows || numRows === 1) return s;
    const result = Array.from({length: numRows}).map(r => ([]));
    const group = 2 * numRows - 2;
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < numRows; j++) {
            if ((i + j) % group === 0) {
                result[j].push(s[i]); 
            } else if (i % group === j) {
                result[j].push(s[i]);
            }
        }
    }
    return result.map(r => r.join('')).join('');
};