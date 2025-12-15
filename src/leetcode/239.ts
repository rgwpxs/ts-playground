/**
 * 239. 滑动窗口最大值 （待完成，还剩2-3个超时用例）
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
    const result = [], map = {}, heap = [];
    const swapPos = (p, c) => {
        const temp = heap[c];
        heap[c] = heap[p];
        heap[p] = temp;
    }
    const insertIntoHeap = (val) => {
        // console.log('insertIntoHeap', val);
        if (map[val]) {
            map[val]++;
            return;
        } else {
            map[val] = 1;
        }
        let c = heap.length;
        let p = Math.floor((c - 1) / 2);
        heap.push(val);
        while(p >= 0 && heap[p] < heap[c]) {
            swapPos(p, c);
            c = p;
            p = Math.floor((c - 1) / 2);
        }
        // console.log('After Insertion', JSON.stringify(heap));
    }
    const deleteFromHeap = (val) => {
        // console.log('deleteFromHeap', val);
        if (map[val] > 1) {
            map[val]--;
            return;
        }
        map[val]--;
        let p = heap.indexOf(val), len = heap.length;
        if (p === len - 1) { heap.pop(); return; }
        heap[p] = heap[len-1];
        heap.pop();
        let np = Math.floor((p - 1) / 2);
        if (np > 0 && heap[np] < heap[p]) {
            while(np > 0 && heap[np] < heap[p]) {
                swapPos(np, p);
                p = np;
                np = Math.floor((p - 1) / 2);
            }
        } else {
            len = heap.length;
            shiftDown(p, len);
        }
        
        // console.log('After Deletion', JSON.stringify(heap));
    }
    const shiftDown = (p, len) => {
        let c1 = 2 * p + 1, c2 = 2 * p + 2;
        let v1 = heap[c1], v2 = heap[c2];
        if (c2 < len) {
            if (v1 >= v2 && v1 > heap[p]) {
                swapPos(c1, p);
                shiftDown(c1, len);
            } else if (v2 > heap[p]) {
                swapPos(c2, p);
                shiftDown(c2, len);
            }
        } else if (c1 < len) {
            if (v1 > heap[p]) {
                swapPos(c1, p);
                shiftDown(c1, len);
            }
        }
    }
    // init heap
    for (let i = 0; i < k; i++) {
        insertIntoHeap(nums[i]);
    }
    if (heap.length) result.push(heap[0]);
    for (let i = k; i < nums.length; i++) {
        if (nums[i] !== nums[i - k]) {
            deleteFromHeap(nums[i - k]);
            insertIntoHeap(nums[i]);
        }
        result.push(heap[0]);
    }
    return result;
};

const nums = [-5769,-7887,-5709,4600,-7919,9807,1303,-2644,1144,-6410,-7159,-2041,9059,-663,4612,-257,2870,-6646,8161,3380,6823,1871,-4030,-1758,4834,-5317,6218,-4105,6869,8595,8718,-4141,-3893,-4259,-3440,-5426,9766,-5396,-7824,-3941,4600,-1485,-1486,-4530,-1636,-2088,-5295,-5383,5786,-9489,3180,-4575,-7043,-2153,1123,1750,-1347,-4299,-4401,-7772,5872,6144,-4953,-9934,8507,951,-8828,-5942,-3499,-174,7629,5877,3338,8899,4223,-8068,3775,7954,8740,4567,6280,-7687,-4811,-8094,2209,-4476,-8328,2385,-2156,7028,-3864,7272,-1199,-1397,1581,-9635,9087,-6262,-3061,-6083,-2825,-8574,5534,4006,-2691,6699,7558,-453,3492,3416,2218,7537,8854,-3321,-5489,-945,1302,-7176,-9201,-9588,-140,1369,3322,-7320,-8426,-8446,-2475,8243,-3324,8993,8315,2863,-7580,-7949,4400];
const k = 6;
const res = maxSlidingWindow(nums, k);
const answers = [9807,9807,9807,9807,9807,9807,1303,9059,9059,9059,9059,9059,9059,8161,8161,8161,8161,8161,8161,6823,6823,6218,6218,6869,8595,8718,8718,8718,8718,8718,8718,9766,9766,9766,9766,9766,9766,4600,4600,4600,4600,-1485,-1486,5786,5786,5786,5786,5786,5786,3180,3180,1750,1750,1750,1750,5872,6144,6144,6144,8507,8507,8507,8507,8507,8507,7629,7629,7629,8899,8899,8899,8899,8899,8899,8740,8740,8740,8740,8740,6280,6280,2209,2385,2385,7028,7028,7272,7272,7272,7272,7272,9087,9087,9087,9087,9087,9087,5534,5534,5534,6699,7558,7558,7558,7558,7558,7558,8854,8854,8854,8854,8854,8854,1302,1302,1302,1369,3322,3322,3322,3322,3322,8243,8243,8993,8993,8993,8993,8993,8993];
if (res.length !== answers.length) console.log('--- Length Error ---');
for(let i = 0; i < res.length; i++) {
    if (res[i] !== answers[i]) console.log('--- Result Error ---', i, res[i], answers[i]);
}

