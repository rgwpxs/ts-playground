/**
 * 62. 旋转链表
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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !k) return head;
    let pre = head, last = head, arr = []
    while (last) {
        arr.push(last);
        if (!last.next) {
            pre = last;
        }
        last = last.next;
    }
    k = k % arr.length;
    if (k === 0) {
        return head;
    } else {
        pre.next = head;
    }
    
    const tail = arr[arr.length - k - 1];

    head = tail.next;
    tail.next = null;
    return head;
};