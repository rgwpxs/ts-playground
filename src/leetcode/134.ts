/**
 * 134. 加油站
 * @param gas 
 * @param cost 
 * @returns 
 */
function canCompleteCircuit(gas: number[], cost: number[]): number {
    if (!gas || !gas.length) return -1;
    let starts = [];
    let gasSum = 0, costSum = 0;
    let cg = [], cc = [];
    let compressed = false;
    for(let i = 0; i < gas.length; i++) {
        if (!cost[i] && !gas[i]) {
            compressed = true;
            continue;
        }
        gasSum += gas[i];
        costSum += cost[i];
        cg.push(gas[i]);
        cc.push(cost[i]);
        if (cost[i] <= gas[i]) starts.push(cg.length - 1);
    }
    if (costSum > gasSum) return -1;
    if (!starts.length) return -1;
    // console.log(JSON.stringify(starts));
    starts = starts.filter(s => {
        let i = s, remains = cg[i] - cc[i];
        i = ++i % cg.length;
        while(remains >= 0 && i !== s) {
            remains = remains + cg[i] - cc[i];
            // console.log('s ', s, 'idx', i, gas[i], cost[i], 'remains', remains);
            i = ++i % cg.length;
            // console.log('after updated i', i, s);
        }
        if (i === s && remains >= 0) return true;
        return false;
    })
    // console.log('after filtered', JSON.stringify(starts));
    if (!starts.length) {
        return -1;
    } else if (compressed) {
        const s = starts[0];
        return gas.findIndex((g, i) => g === cg[s] && cost[i] === cc[s]);
    } else {
        return starts[0];
    }
};