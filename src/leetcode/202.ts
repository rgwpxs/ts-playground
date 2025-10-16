/**
 * 202. 快乐数
 * 难在何时跳出，非快乐数会有死循环，也就是数组中重复值
 * @param n 
 * @returns 
 */
function isHappy(n: number): boolean {
    const equalOne = (num) => {
        const arr = ('' + num).split('').map(i => parseInt(i));
        const sum = arr.reduce((acc, cur) => acc + cur, 0);
        return sum === 1;
    }
    if (equalOne(n)) return true;
    const restriction = Math.pow(2, 31) - 1;
    let s = [n];
    for (let i = 0; i < s.length; i++) {
        const val = ('' + s[i]).split('').map(i => {
            const p = parseInt(i);
            return p*p;
        }).reduce((acc, cur) => acc + cur, 0);
        console.log(val);
        if (equalOne(val)) {
            return true;
        } else if (s.indexOf(val) !== -1) {
            return false;
        } else {
            s.push(val);
        }
    }
    return false;
};