/**
 * 82. 删除排序链表中的重复元素 II     中等
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
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

function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head) return head;
    const s = new Set();
    const dups = [];
    let end = head;
    s.add(end.val);
    while(end.next) {
        if (s.has(end.next.val)) {
            dups.push(end.next.val);
            end.next = end.next.next;
        } else {
            s.add(end.next.val);
            end = end.next;
        }
    }
    if (dups.length) {
        end = head;
        let pre = end;
        while(end) {
            if (dups.indexOf(end.val) > -1) {
                if (end === head) {
                    head = end.next;
                    end = head;
                    pre = head;
                } else {
                    pre.next = end.next; 
                    end = pre.next;
                }
            } else {
                pre = end;
                end = end.next;
            }
        }
    }
    return head;
};