type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;

        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) throw new Error("Index out of bounds");

        if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }

        this.length++;
        const curr = this.getAt(idx) as Node<T>;
        const node = { value: item } as Node<T>;

        node.prev = curr.prev;
        node.next = curr;

        if (curr.prev) curr.prev.next = node;
        curr.prev = node;
    }

    append(item: T): void {
        if (!this.tail) {
            this.prepend(item);
            return;
        }

        this.length++;
        const node = { value: item } as Node<T>;

        this.tail.next = node;
        node.prev = this.tail;

        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) break;
            curr = curr.next;
        }

        if (!curr) return undefined;

        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (!node) return undefined;

        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;

        if (this.length === 0) {
            const output = this.head?.value;
            this.head = this.tail = undefined;
            return output;
        }

        if (node.next) node.next.prev = node.prev;
        if (node.prev) node.prev.next = node.next;

        if (node === this.head) this.head = node.next;
        if (node === this.tail) this.tail = node.prev;

        node.prev = node.next = undefined;

        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;

        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        return curr;
    }
}
