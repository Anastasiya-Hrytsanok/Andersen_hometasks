const isString = (str) => typeof str === 'string';

const concatStrings = (str, separator = '') => {
  const resultString = [];
  let ignore = false;
  let resultSeparator = '';

  function innerConcatString(s, sep) {
    if (!ignore) {
      if (isString(sep)) {
        resultSeparator = sep;
      }

      if (isString(s)) {
        resultString.push(s);
      } else {
        ignore = true;
      }
    }

    if (s === undefined) {
      return resultString.join(resultSeparator);
    }

    return innerConcatString;
  }

  return innerConcatString(str, separator);
};

class Calculator {
  constructor(x, y) {
    this.setX(x);
    this.setY(y);
    this.logSum = this.logSum.bind(this);
    this.logMul = this.logMul.bind(this);
    this.logSub = this.logSub.bind(this);
    this.logDiv = this.logDiv.bind(this);
  }

  setX(num) {
    if (!Number.isFinite(num)) {
      throw new Error('Invalid value');
    }

    this.x = num;
  }

  setY(num) {
    if (!Number.isFinite(num)) {
      throw new Error('Invalid value');
    }

    this.y = num;
  }

  logSum = () => this.x + this.y;

  logMul = () => this.x * this.y;

  logSub = () => this.x - this.y;

  logDiv = () => {
    if (this.y === 0) {
      throw new Error('0 cannot be a divisor');
    }

    return this.x / this.y;
  }
}