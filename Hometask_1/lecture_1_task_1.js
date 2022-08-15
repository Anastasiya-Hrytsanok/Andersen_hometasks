let firstValue = window.prompt('Введите первое значение');
let secondValue = window.prompt('Введите второе значение');

const parseNumber = (value) => {
  if (!value) {
    throw new Error('Некорректный ввод!');
  }

  let trimmedValue = value.trim();

  if (trimmedValue === '0') {
    return 0;
  } else if (!isFinite(Number(trimmedValue)) || !trimmedValue) {
    throw new Error('Некорректный ввод!');
  } else {
    return Number(trimmedValue);
  }
};

const checkSystemConvertion = (value) => {
  let parsedValue = parseNumber(value);

  if (2 <= parsedValue && parsedValue <= 36) {
    return parsedValue;
  } else {
    throw new Error('Некорректный ввод!');
  }
};

const convertNumberIntoSystem = (number, systemConversion) => {
  try {
    let parsedNumber = parseNumber(number);
    let parsedConvertionSystem = checkSystemConvertion(systemConversion);

    return parsedNumber.toString(parsedConvertionSystem);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(e);
    }
  }
};

console.log(convertNumberIntoSystem(firstValue, secondValue));