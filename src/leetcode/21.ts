/**
 * 21. 合并两个有序链表    简单
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (!list1 && !list2) return null;
    let s1 = list1;
    let s2 = list2;
    let result = new ListNode(), last = result;
    while(s1 || s2) {
        if (s1 && s2) {
            let a = s1.val, b = s2.val;
            if (a === b) {
                last.val = a;
                last.next = new ListNode(b);
                last = last.next;
                s1 = s1.next;
                s2 = s2.next;
            } else if (a > b) {
                last.val = b;
                s2 = s2.next;
            } else {
                last.val = a;
                s1 = s1.next;
            }
        } else if (s1) {
            last.val = s1.val;
            s1 = s1.next;
        } else if (s2) {
            last.val = s2.val;
            s2 = s2.next;
        }
        if (s1 || s2) {
            last.next = new ListNode();
            last = last.next;
        }
    }
    return result
};