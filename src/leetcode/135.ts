// 135 分发糖果
/**
    n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
    你需要按照以下要求，给这些孩子分发糖果：

    每个孩子至少分配到 1 个糖果。
    相邻两个孩子评分更高的孩子会获得更多的糖果。
    请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

candy([1,0,2])
candy([1,2,2])
candy([1,3,2,2,1])
candy([1,2,87,87,87,2,1])
[1, 2, 3, 1, 3, 2, 1]
[9, 8, 7, 6, 4, 3, 3, 2, 1]
 */

function candy(ratings: number[]): number {
    if (ratings.length < 2) return ratings.length;
    if (ratings.length === 2) return (ratings[0] === ratings[1]) ? 2 : 3;
    let len = ratings.length - 1;
    const m: number[] = [];
    // console.log('0', JSON.stringify(ratings))
    for (let i = 0; i < len; i++) {
        m[i] = m[i] || 1;
        if (ratings[i] < ratings[i + 1]) {
            m[i + 1] = m[i] + 1;
        } else if (ratings[i] > ratings[i + 1] && m[i] === 1) {
            m[i]++;
        }
    }
    m[len] = m[len] || 1;
    // console.log('1st', JSON.stringify(m));
    for (let i = len; i > 0; i--) {
        if (ratings[i] > ratings[i-1] && m[i] <= m[i-1]) {
            m[i] = m[i-1] + 1;
        } else if (ratings[i] < ratings[i-1] && m[i] >= m[i-1]) {
            m[i-1] = m[i] + 1;
        }
    }
    // console.log('2nd', JSON.stringify(m));
    // console.log(m.reduce((acc, cur) => acc + cur, 0));
    return m.reduce((acc, cur) => acc + cur, 0);
};

candy([1,0,2])  // [2, 1, 2] 5
candy([1,2,2])  // [1, 2, 1] 4
candy([1,3,2,2,1]) // [1, 2, 1, 2, 1] 7
candy([1,2,87,87,87,2,1]) // [1, 2, 3, 1, 3, 2, 1] 13
candy([9, 8, 6, 7, 9]) // [3, 2, 1, 2, 3] 11
candy([1,6,10,8,7,3,2]) // [1, 2, 5 ,4, 3, 2, 1] 18
/**
 function candy(ratings: number[]): number {
    if (ratings.length < 2) return ratings.length; 
    const m = new Map();
    ratings.forEach((r, i) => m.set(i, 1));
    for (let i = 0; i < ratings.length - 1; i++) {
        if (ratings[i] > ratings[i+1] && m.get(i) <= m.get(i + 1)) {
            const base = Math.max(m.get(i), m.get(i+1));
            m.set(i, base + 1);
        } else if (ratings[i] < ratings[i+1]) {
            const base = Math.max(m.get(i), m.get(i+1));
            m.set(i + 1, base + 1);
        }
    }
    const count = Array.from(m).reduce((acc, cur) => acc + cur[1], 0);
    console.log(count, JSON.stringify(Array.from(m).map(it => it[1])));
    return count;
};
 */
