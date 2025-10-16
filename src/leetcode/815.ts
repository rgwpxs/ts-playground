/**
 * 815. 公交线路
 */

function numBusesToDestination(routes: number[][], source: number, target: number): number {
    if (source === target) return 0;

    const starter = []; // 存储公交车编号
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].indexOf(source) > -1) {
            if (routes[i].indexOf(target) > -1) return (target === source ? 0 : 1);
            starter.push(i);
        }
    }
    let queue = [...starter]; // 遍历队列
    let deeps = {};
    starter.forEach(it => deeps[it] = 1);
    let flag = queue.map(i => false);
    let min = Infinity;
    console.log(routes.length, starter.length);
    for(let i = 0; i < queue.length; i++) {
        const r = queue[i]; // 公交车编号
        for (let j = 0; j < routes.length; j++) {
            if (j === r || deeps[j]) continue;
            if (routes[j].some(c => routes[r].some(p => p === c))) {
                console.log('from r', r,'next j', j, 'current deeps', deeps[r] + 1);
                deeps[j] = deeps[r] + 1;
                if (routes[j].indexOf(target) > -1) {
                    flag[i] = true; 
                    console.log('---------found target-------------')
                    min = Math.min(min, deeps[j])
                } else {
                    queue.push(j);
                    console.log('---push j----', j);
                }
            }
        }
    }
    if (flag.some(f => f)) {
        return min;
    } else {
        return -1;
    }
};