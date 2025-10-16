// 273 H指数
function hIndex(citations: number[]): number {
    const cleaned = citations.filter(c => !!c).sort((a, b) => (a - b));
    const maxH = cleaned.length;
    if (!maxH) return 0;
    let h = maxH;
    for (let i = 0; i < maxH; i++) {
        if (cleaned[i] < h) {
            h--;
        }
    }
    // console.log(h)
    return h;
};

hIndex([3,0,6,1,5])
hIndex([1,3,1])
hIndex([1,1])