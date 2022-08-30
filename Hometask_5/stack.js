class StackElement {
  constructor(value, prevElement) {
    this.value = value;
    this.prevElement = prevElement;
  }
}

class Stack {
  constructor(maxCount = 10) {
    if (!Number.isFinite(maxCount)) {
      throw new Error('Invalid value');
    }

    this.maxCount = maxCount;
    this.head = null;
    this.elementCount = 0;
  }

  push(elem) {
    if (this.elementCount === this.maxCount) {
      throw new Error('Stack is full');
    }

    const newElement = new StackElement(elem, this.head);
    this.head = newElement;
    this.elementCount++;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    const headElement = this.head;
    this.head = this.head.prevElement;
    headElement.prevElement = null;
    this.elementCount--;

    return headElement.value;
  }

  peek() {
    return this.isEmpty() ? null : this.head.value;
  }

  isEmpty() {
    return this.elementCount === 0;
  }

  toArray() {
    const stackArr = [];
    let topElement = this.head;

    while (topElement !== null) {
      stackArr.push(topElement.value);
      topElement = topElement.prevElement;
    }

    return stackArr;
  }

  static fromIterable(iterable) {
    if (iterable === null || typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Entity is not iterable');
    }

    const newStack = new Stack(Object.keys(iterable).length);

    for (const elem of iterable) {
      newStack.push(elem);
    }

    return newStack;
  }
}

module.exports = { Stack };
