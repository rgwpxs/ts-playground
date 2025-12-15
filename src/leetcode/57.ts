/**
 * 57. 插入区间
 */

function insert(intervals: number[][], newInterval: number[]): number[][] {
    const result = [];
    const [l, r] = newInterval;
    let inserted = false;
    for(let i = 0; i < intervals.length; i++) {
        let [s, e] = intervals[i];
        // [s, e], [l, r];
        if (l > e || inserted) {
            result.push([s,e]);
            continue;
        }
        // [l, r], [s, e]
        if (r < s && !inserted) {
            result.push(newInterval);
            result.push([s, e]);
            inserted = true;
            continue;
        }
        // console.log(i, l, s, r, e);
        // r >= s || e >= l
        s = Math.min(l, s);
        e = Math.max(r, e);
        while((i + 1) < intervals.length && intervals[i+1][0] <= e) {
            e = Math.max(intervals[i+1][1], e);
            i++;
        }
        // console.log('after', i, s, e);
        result.push([s, e]);
        inserted = true;
    }
    if (!inserted) {
        result.push(newInterval);
    }

    return result;
};