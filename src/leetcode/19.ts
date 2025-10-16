/**
 * 19. 删除链表的倒数第 N 个结点      中等
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head) return head;
    let end = head, count = 1;
    while (end) {
        end = end.next;
        count++;
    }
    const target = count - n - 1;
    if (target === 0) {
        head = head.next;
        return head;
    }
    end = head;
    count = 1;
    let left, right;
    while(end) {
        if (count === target) {
            left = end;
            break;
        }
        end = end.next;
        count++
    }
    right = left?.next?.next;
    left.next = right;

    return head;
};