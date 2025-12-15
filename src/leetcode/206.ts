/**
 * 206. 反转链表
 */

/**
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

function reverseList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    let n = head, list = [];
    while(n) {
        list.push(n);
        n = n.next;
    }
    for(let i = list.length - 1; i > 0; i--) {
        const node = list[i];
        node.next = list[i - 1];
    }
    list[0].next = null;
    return list[list.length - 1];
};