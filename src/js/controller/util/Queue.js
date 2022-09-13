export class Queue {
    constructor(max = -1) {
        this.max = max
        this.queue = []
    }

    first() { return this.queue[0] }
    last() { return this.queue.lastItem }

    enqueue(node) {
        this.queue.push(node)
        if(this.max > 0 && this.queue.length > this.max)
            this.dequeue()
    }

    dequeue() {
        return this.queue.shift()
    }

    clear() {
        this.queue = []
    }
}