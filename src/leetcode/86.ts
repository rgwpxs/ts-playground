/**
 * 86. 分隔链表
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function partition(head: ListNode | null, x: number): ListNode | null {
    let ls: ListNode | null = null, le: ListNode | null = null, 
        rs: ListNode | null = null, re: ListNode | null = null, 
        end = head;
    while(end) {
        if (end.val < x) {
            if (!ls || !le) {
                ls = end;
                le = end;
            } else {
                le.next = end;
                le = le.next;
            }
            console.log('le', end.val);
        } else {
            if (!rs || !re) {
                rs = end;
                re = end;
            } else {
                re.next = end;
                re = re.next;
            }
            console.log('re', end.val);
        }
        end = end.next;
    }
    console.log(le?.val, rs?.val);
    if (le) {
        le.next = rs;
        if (re) {
            re.next = null;
        }
        return ls;
    } else {
        if (re) re.next = null;
        return rs;
    }
};


const test = [1,4,3,2,5,2];
const head = new ListNode();
let start = head;
for (let i = 0; i < test.length; i++) {
    start.val = test[i];
    if (i !== test.length - 1) {
        start.next = new ListNode();
        start = start.next;
    }
}

const result = partition(head, 3);

let end = result;
const arr = [];
while(end) {
    arr.push(end.val);
    end = end.next;
}

console.log(arr.join());