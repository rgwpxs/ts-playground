/**
 * 11. 盛最多水的容器
 */

function maxArea(height: number[]): number {
    let area = 0;
    let i = 0, j = height.length - 1;
    while(j > i) {
        const l = height[i], r = height[j];
        let h = l;
        if (l > r) {
            j--;
            h = r;
        } else {
            i++;
        }
        area = Math.max(area, h * (j - i + 1));
    }
    return area;
};