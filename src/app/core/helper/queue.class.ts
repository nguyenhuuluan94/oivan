export class Queue {
  private items: any[] = [];
  constructor() {}

  enqueue(newItems: any[] = []) {
    this.items = [...this.items, ...newItems]
  }

  dequeue() {
    return this.items.splice(0, 4);
  }

  get isEmpty(){
    return this.items.length === 0;
  }
}
