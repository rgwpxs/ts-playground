/**
 * 239. 滑动窗口最大值 （待完成，还剩2-3个超时用例）
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
    // write code here
    if (!k || !nums?.length || k > nums?.length) {
        return [];
    }
    let heap = [], result = [];
    // n是索引，构造一个索引堆 del和n分别是待删除和添加的nums索引
    const insertIntoMaxHeap = (n, del?) => {
        // console.log('insert', JSON.stringify(heap), n, nums[n]);
        if (typeof del === "undefined") {
            heap.push(n);
            shiftUp(heap.length - 1);
        } else {
            const idx = heap.indexOf(del);
            heap[idx] = n;
            if (nums[del] > nums[n]) {
                shiftDown(idx);
            } else if (nums[del] < nums[n]) {
                shiftUp(idx);
            }
        }
        
    }
    const shiftUp = (idx) => {
        let i = idx, p = Math.ceil(i / 2) - 1;
        const temp = heap[i];
        while(p > 0 && nums[heap[p]] < nums[temp]) {
            heap[i] = heap[p];
            i = p;
            p = Math.ceil(i / 2) - 1;
        }
        if (nums[heap[p]] < nums[temp] && p === 0) {
            heap[i] = heap[p];
            heap[p] = temp;
        } else {
            heap[i] = temp;
        }
    }
    const shiftDown = (idx) => {
        let i = idx, lastP = Math.floor(heap.length / 2) - 1, temp = heap[i], tempVal = nums[temp];
        let l = i * 2 + 1, r = i * 2 + 2, lv = nums[heap[l]], rv = nums[heap[r]];
        if ((tempVal >= (lv || -Infinity)) && (tempVal >= (rv || -Infinity))) {
            return;
        }
        while(i <= lastP && ((tempVal < (lv || -Infinity)) || (tempVal < (rv || -Infinity)))) {
            if (r < heap.length) {
                if (lv >= rv) {
                    heap[i] = heap[l];
                    i = l;
                } else {
                    heap[i] = heap[r];
                    i = r;
                }
            } else {
                heap[i] = heap[l];
                i = l;
            }
            l = i * 2 + 1;
            r = i * 2 + 2;
            lv = nums[heap[l]];
            rv = nums[heap[r]];
            // cv = nums[heap[i]];
        }
        heap[i] = temp;
    }
    // init maxHeap of given size - k
    for(let i = 0; i < k; i++) {
        insertIntoMaxHeap(i);
    }
    result.push(nums[heap[0]]);
    for(let i = k; i < nums.length; i++) {
        insertIntoMaxHeap(i, i - k);
        result.push(nums[heap[0]]);
    }
    return result;
};