function maxSlidingWindow(nums: number[], k: number): number[] {
    // write code here
    if (!k || !nums?.length || k > nums?.length) {
        return [];
    }
    let maxHeap = [], result = [];
    const swap = (heap, a, b) => {
        const temp = heap[a];
        heap[a] = heap[b];
        heap[b] = temp;
    }
    // n是索引，构造一个索引堆 del和n分别是待删除和添加的nums索引
    const insertIntoMaxHeap = (heap, n, del = -1) => {
        // console.log('insert', JSON.stringify(heap), n, nums[n]);
        if (del === -1) {
            heap.push(n);
            shiftUp(heap, heap.length - 1);
        } else {
            const idx = heap.indexOf(del);
            heap[idx] = n;
            if (nums[del] > nums[n]) {
                shiftDown(heap, idx);
            } else if (nums[del] < nums[n]) {
                shiftUp(heap, idx);
            }
        }
        
    }

    const shiftUp = (heap, idx) => {
        let i = idx, p = Math.ceil(i / 2) - 1;
        const temp = heap[i];
        while(p > 0 && nums[heap[p]] < nums[temp]) {
            // swap(heap, i, p);
            heap[i] = heap[p];
            i = p;
            p = Math.ceil(i / 2) - 1;
        }
        if (nums[heap[p]] < nums[heap[i]] && p === 0) {
            // swap(heap, i, p);
            heap[i] = heap[p];
            heap[p] = temp;
        } else {
            heap[i] = temp;
        }
    }

    const shiftDown = (heap, idx) => {
        console.log('shiftDown')
        let i = idx, lastP = Math.floor(heap.length / 2) - 1;
        let l = i * 2 + 1, r = i * 2 + 2;
        if ((nums[heap[i]] >= (nums[heap[l]] || -Infinity)) && (nums[heap[i]] >= (nums[heap[r]] || -Infinity))) {
            return;
        }
        while(i <= lastP && ((nums[heap[i]] < (nums[heap[l]] || -Infinity)) || (nums[heap[i]] < (nums[heap[r]] || -Infinity)))) {
            if (r < heap.length) {
                if (nums[heap[l]] >= nums[heap[r]]) {
                    swap(heap, i, l);
                    i = l;
                } else {
                    swap(heap, i, r);
                    i = r;
                }
            } else {
                swap(heap, i, l);
                i = l;
            }
            l = i * 2 + 1;
            r = i * 2 + 2;
        }
    }
    // init maxHeap of given size - k
    for(let i = 0; i < k; i++) {
        insertIntoMaxHeap(maxHeap, i);
    }
    result.push(nums[maxHeap[0]]);
    for(let i = k; i < nums.length; i++) {
        console.log(JSON.stringify(maxHeap), 'deleted idx', i-k, 'add idx', i, 'deleteVal', nums[i-k], 'addVal', nums[i])
        console.log('---before replace---', JSON.stringify(maxHeap.map(i => nums[i])));
        insertIntoMaxHeap(maxHeap, i, i - k);
        console.log('---after replace---', JSON.stringify(maxHeap.map(i => nums[i])));
        result.push(nums[maxHeap[0]]);
    }
    return result;
};

const nums = [1,3,-1,-3,5,3,6,7];
const k = 3;
maxSlidingWindow(nums, k);