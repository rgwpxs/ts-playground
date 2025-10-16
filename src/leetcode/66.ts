/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits: number[]): number[] {
    let left = digits.length - 1;
    let stepin = false;
    if (digits[left] + 1 < 10) {
        digits[left] = digits[left] + 1;
        return digits;
    }
    
    while(digits[left] + 1 >= 10 && left >= 0) {
        stepin = true;
        digits[left] = (digits[left] + 1) % 10;
        left = left - 1;
    }
    // console.log(left, digits[0] + 1)
    if (left < 0) {
        for (let i = digits.length; i > 0; i--) {
            digits[i] = digits[i-1];
        }
        digits[0] = 1;
    } else if (stepin) {
        digits[left] += 1;
    }
    return digits;
};

console.log(plusOne([9]));
console.log('next');
console.log(plusOne([8,9,9,9]));