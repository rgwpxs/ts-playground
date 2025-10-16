// 380 O(1)时间的增删和随机返回
class RandomizedSet {
    public s: Set<number>;
    constructor() {
        this.s = new Set()
    }

    insert(val: number): boolean {
        if (this.s.has(val)) return false;
        this.s.add(val)
        return true;
    }

    remove(val: number): boolean {
        if (!this.s.has(val)) return false;
        this.s.delete(val);
        return true;
    }

    getRandom(): number {
        const idx = Math.floor(Math.random() * this.s.size);
        return Array.from(this.s)[idx];
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
