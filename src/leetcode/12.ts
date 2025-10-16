/**
 * 12. 整数转罗马数字
 * @param num 
 * @returns 
 */
function intToRoman(num: number): string {
    const m = { 1: 'I', 4: 'IV', 5: 'V', 9: 'IX', 10: 'X', 
                40: 'XL', 50: 'L', 90: 'XC', 100: 'C', 
                400: 'CD', 500: 'D', 900: 'CM', 1000: 'M'};
    let remains = num, count = 0, result = [], starter = [3, 2, 1, 0];
    starter.forEach((s) => {
        const base = Math.pow(10, s);
        if (remains >= base) {
            const count = Math.floor(remains / base);
            if (m[count * base]) {
                result.push(m[count * base]);
            } else if (count > 5) {
                result.push(m[5 * base]);
                Array.from({length: count - 5}).forEach(() => result.push(m[base]));
            } else {
                Array.from({length: count}).forEach(() => result.push(m[base]));
            }
            remains = remains % base;
        }
    })
    
    return result.join('');
};