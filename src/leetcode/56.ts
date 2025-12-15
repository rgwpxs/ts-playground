/**
 * 56. 合并区间
 */

function merge(intervals: number[][]): number[][] {
    if (!intervals?.length || intervals.length === 1) return intervals;
    const visited = [];
    let result = [];
    for(let i = 0; i < intervals.length; i++) {
        // console.log(i, visited[i]);
        if (visited[i]) continue;
        visited[i] = true;
        const cur = intervals[i];
        let l = cur[0], r = cur[1];
        for (let j = i+1; j < intervals.length; j++) {
            if (visited[j]) continue;
            const [s, e] = intervals[j];
            // console.log(s, l, e, r, r < s || l > e, s >= l && e <= r);
            if (r < s || l > e) continue;
            if (s >= l && e <= r) {
                visited[j] = true;
                continue;
            }
            l = Math.min(l, s);
            r = Math.max(r, e);
            visited[j] = true;
        }
        // console.log(i, l, r);
        const dups = [];
        for (let j = 0; j < result.length; j++) {
            const [s, e] = result[j];
            if (r < s || l > e) continue;
            l = Math.min(s, l);
            r = Math.max(e, r);
            dups[j] = true;
        }
        result = result.filter((v, j) => !dups[j]);
        result.push([l, r]);
    }
    return result;
};

// 暴力题解
function merge(intervals: number[][]): number[][] {
    const n = intervals.length;
    if (n < 2) return intervals;
    // 问题就在于，计算机的比较只发生在两者之间
    for (let i = 0; i < n; i++) {
        let merged = false;
        const a = intervals[i], al = a[0], ar = a[1];
        for (let j = i+1; j < n; j++) {
            if (merged) break; 
            const b = intervals[j], bl = b[0], br = b[1];
            if (al > br || bl > ar) continue;
            const nl = Math.min(al, bl), nr = Math.max(ar, br);
            intervals[i] = null;
            intervals[j] = [nl, nr];
            merged = true;
        }
    }
     
    return intervals.filter(i => !!i);
};

// 排序优化后