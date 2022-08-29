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
    if (arguments.length > 2) {
      throw new Error('Invalid value');
    }

    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.logSum = this.logSum.bind(this);
    this.logMul = this.logMul.bind(this);
    this.logSub = this.logSub.bind(this);
    this.logDiv = this.logDiv.bind(this);
    this.setX(x);
    this.setY(y);
  }

  setX = (num) => {
    if (!Number.isFinite(num)) {
      throw new Error('Invalid value');
    }

    this.x = num;
  };

  setY = (num) => {
    if (!Number.isFinite(num)) {
      throw new Error('Invalid value');
    }

    this.y = num;
  };

  logSum = () => console.log(this.x + this.y);

  logMul = () => console.log(this.x * this.y);

  logSub = () => console.log(this.x - this.y);

  logDiv = () => {
    if (this.y === 0) {
      throw new Error('0 cannot be a divisor');
    }

    console.log(this.x / this.y);
  };
}
