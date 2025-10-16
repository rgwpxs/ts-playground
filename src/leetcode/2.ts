/**
 * 2. 两数相加    中等
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let increment = 0;
    let pos = 0;
    let start1 = l1;
    let start2 = l2;
    let result = new ListNode();
    let step = result;
    while(start1 || start2) {
        const a = start1?.val || 0;
        const b = start2?.val || 0;
        let r = a + b + increment;
        if (r > 9) {
            increment = 1;
            r = r % 10;
        } else {
            increment = 0;
        }
        step.val = r;
        start1 = start1?.next;
        start2 = start2?.next;
        if (start1 || start2 || increment) {
            step.next = new ListNode();
            step = step.next;
        }
    }
    if (increment) {
        step.val = 1;
    } else {
        step = null;
    }
    return result;
};