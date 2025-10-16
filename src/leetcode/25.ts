/**
 * 25. K 个一组翻转链表      困难
给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (!head || k < 2) return head;
    let arr: ListNode[] = [], end: ListNode | null = head, count = 1, last;
    while (end) {
        console.log(end.val);
        if (count === k) {
            let start = end;
            head = end;
            end = end.next;
            for (let i = arr.length - 1; i >= 0; i--) {
                start.next = arr[i]
                start = start.next;
            }
            arr = [arr[0]];
        } else if (count % k === 0) {
            arr[0].next = end;
            let start = end;
            end = end.next;
            for (let i = arr.length - 1; i > 0; i--) {
                start.next = arr[i];
                start = start.next;
            }
            arr = [arr[1]];
        } else {
            arr.push(end);
            end = end.next;
        }
        count++;
    }
    if ((count - 1) % k !== 0 && arr.length > 1) {
        let s = arr[0];
        for (let i = 1; i < arr.length; i++) {
            s.next = arr[i];
            s = s.next;
        }
    } else {
        arr[0].next = null;
    }
    return head;
};


const test = [1,2,3,4,5];
const head = new ListNode();
let start = head;
for (let i = 0; i < test.length; i++) {
    start.val = test[i];
    if (i !== test.length - 1) {
        start.next = new ListNode();
        start = start.next;
    }
}

const result = reverseKGroup(head, 2);

let end = result;
const arr = [];
while(end) {
    arr.push(end.val);
    end = end.next;
}

console.log(arr.join());