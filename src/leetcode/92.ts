/**
 * 92. 反转链表2
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) return head;
    let arr = [], last = head, count = 1;
    while(last && count <= right) {
        if (count >= (left - 1) && count <= right) {
            arr.push(last);
        }
        last = last.next;
        count++;
    }
    let start, idx, end;
    if (left > 1) {
        start = arr[0];
        idx = arr.length - 1;
        end = 1;
    } else {
        start = arr[arr.length - 1];
        idx = arr.length - 2;
        end = 0;
        head = start;
    }
    for (let i = idx; i >= end; i--) {
        start.next = arr[i];
        start = start.next;
    }
    start.next = last;
    return head;
};