/**
 * 138 随机链表的复制
 */
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     next: _Node | null
 *     random: _Node | null
 * 
 *     constructor(val?: number, next?: _Node, random?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */


function copyRandomList(head: _Node | null): _Node | null {
    if (!head) return null;
    let result = new _Node(), r = result;
    let last = head;
    let ol = [], nl = []
    while(last) {
        ol.push(last);
        nl.push(r);
        r.val = last.val;
        r.random = null;
        if (last.next) {
            r.next = new _Node();
            r = r.next;
        }
        last = last.next;
    }
    r = result;
    last = head;
    while(last) {
        if (!last.random) {
            r.random = null;
        } else {
            const idx = ol.findIndex(i => i === last.random);
            r.random = nl[idx];
        }
        r = r.next;
        last = last.next;
    }
    return result
};