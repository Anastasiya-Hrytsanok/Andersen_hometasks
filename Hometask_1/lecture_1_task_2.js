const parseNumber = (value) => {

  const trimmedValue = value?.trim();

  if (!isFinite(Number(trimmedValue)) || !trimmedValue) {
    throw new Error('Некорректный ввод!');
  } else {
    return Number(trimmedValue);
  }
};

const calculateSumAndQuotient = (value1, value2) => ({
  sum: value1 + value2,
  quotient: value1 / value2,
});

try {
  const firstValue = window.prompt('Введите первое значение');
  const firstValidValue = parseNumber(firstValue);
  const secondValue = window.prompt('Введите второе значение');
  const secondValidValue = parseNumber(secondValue);

  const { sum, quotient } = calculateSumAndQuotient(firstValidValue, secondValidValue);
  console.log(`Ответ: ${sum}, ${quotient}.`);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message);
  } else {
    console.log(e);
  }
}
