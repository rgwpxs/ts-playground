/**
 * 
149. 直线上最多的点数  困难
给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。
 * 
 */

function maxPoints(points: number[][]): number {
    if (points.length < 3) return points.length;
    let lineMap = new Map();
    for (let i = 0; i < points.length; i++) {
        for(let j = i+1; j < points.length; j++) {
            let x1 = points[j][0], y1 = points[j][1], x2 = points[i][0], y2 = points[i][1];
            let key;
            if (x1 === x2) {
                key = `x=${x1}`;
            } else if (y1 === y2) {
                key = `y=${y1}`;
            } else {
                let k = (y2 - y1) / (x2 - x1);
                let t = y1 - k * x1;
                key = `y=${k}x+${t}`;
            }
            if (lineMap.has(key)) {
                let s = lineMap.get(key);
                s.add(i); s.add(j);
            } else {
                lineMap.set(key, new Set([i, j]));
            }
            console.log(key, `(${x1}, ${y1}), (${x2}, ${y2})`);
        }
    }
    let max = 0;
    for (let key of lineMap.keys()) {
        console.log(key, lineMap.get(key));
        let l = lineMap.get(key).size;
        if (l > max) max = l;
    }
    return max;
};

// console.log(maxPoints([[1,1],[2,2],[3,3]]));
console.log(maxPoints([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]));