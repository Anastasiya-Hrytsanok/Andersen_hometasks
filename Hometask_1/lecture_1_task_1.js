const firstValue = prompt('Введите первое значение');
const secondValue = prompt('Введите второе значение');

const parseNumber = (value) => {

  const trimmedValue = value?.trim();

  if (!isFinite(Number(trimmedValue)) || !trimmedValue) {
    throw new Error('Некорректный ввод!');
  } else {
    return Number(trimmedValue);
  }
};

const checkSystemConvertion = (value) => {
  const parsedValue = parseNumber(value);

  if (2 <= parsedValue && parsedValue <= 36) {
    return parsedValue;
  } else {
    throw new Error('Некорректный ввод!');
  }
};

const convertNumberIntoSystem = (number, systemConversion) => {
  try {
    const parsedNumber = parseNumber(number);
    const parsedConvertionSystem = checkSystemConvertion(systemConversion);

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