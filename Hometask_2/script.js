const hasObjectType = (obj) => typeof obj === 'object' && obj !== null;
const isNumber = (value) => typeof value === 'number' && !isNaN(value);

const checkForArrayOfNumbers = (arr) => {
  let notNumberInArr = arr.some((el) => !isNumber(el));

  if (!Array.isArray(arr) || notNumberInArr) {
    throw new Error('Invalid value');
  }
};

const checkForNumber = (value) => {
  if (!isNumber(value)) {
    throw new Error('Invalid value');
  }
};

const copyArray = (arr) =>
  arr.map((el) => {
    if (Array.isArray(el)) {
      return copyArray(el);
    }

    return hasObjectType(el) ? makeObjectDeepCopy(el) : el;
  });

const makeObjectDeepCopy = (obj) => {
  let objCopy = {};

  for (let key in obj) {
    const currentObjProp = obj[key];

    if (Array.isArray(currentObjProp)) {
      objCopy[key] = copyArray(currentObjProp);
    } else if (hasObjectType(currentObjProp)) {
      objCopy[key] = makeObjectDeepCopy(currentObjProp);
    } else {
      objCopy[key] = currentObjProp;
    }
  }

  return objCopy;
};

const selectFromInterval = (
  numbersArray,
  firstIntervalValue,
  secondIntervalValue
) => {
  checkForArrayOfNumbers(numbersArray);
  checkForNumber(firstIntervalValue);
  checkForNumber(secondIntervalValue);

  if (secondIntervalValue < firstIntervalValue) {
    [firstIntervalValue, secondIntervalValue] = [
      secondIntervalValue,
      firstIntervalValue,
    ];
  }

  return numbersArray.filter(
    (el) => el <= secondIntervalValue && el >= firstIntervalValue
  );
};

const myIterable = {
  from: 1,
  to: 4,
};

myIterable[Symbol.iterator] = function () {
  if (!isNumber(this.from) || !isNumber(this.to) || this.from > this.to) {
    throw new Error('Invalid value');
  }

  return {
    current: this.from,
    last: this.to,

    next() {
      const result = {
        value: this.current,
        done: this.current > this.last,
      };

      this.current++;

      return result;
    },
  };
};