const zero = '0';
const delimeter = '.';
const minusSign = '-';
const resultIsUndefinedErrorMessage = 'Fault';
const overflowErrroMessage = 'Overflow';
const emptyString = '';

const OPERATIONS = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
};

class CalculatorError extends Error {
}

const STATE = {
  SET_FIRST_OPERAND: 'setFirstOperand',
  SET_SECOND_OPERAND: 'setSecondOperand',
  SET_SECOND_OPERAND_WITH_RESET: 'setSecondOperandWithReset',
  FINISHED_CALCULATION: 'finishedCalculation',
};

class Calculator {
  constructor() {
    this.currentState = STATE.SET_FIRST_OPERAND;
    this.leftOperand = undefined;
    this.operation = undefined;
    this.rightOperand = undefined;
    this.result = undefined;
    this.hasError = false;
  }

  setOperand(value) {
    switch (this.currentState) {
      case STATE.SET_FIRST_OPERAND: {
        this.leftOperand = value;
        break;
      }
      case STATE.SET_SECOND_OPERAND:
      case STATE.SET_SECOND_OPERAND_WITH_RESET: {
        this.rightOperand = value;
        break;
      }
    }

    this.display();
  }

  display() {
    switch (this.currentState) {
      case STATE.SET_FIRST_OPERAND: {
        currentResult.value = emptyString;
        textarea.value = this.leftOperand || zero;
        break;
      }
      case STATE.SET_SECOND_OPERAND:
      case STATE.SET_SECOND_OPERAND_WITH_RESET: {
        currentResult.value = `${this.leftOperand} ${this.operation}`;
        textarea.value = this.rightOperand || zero;
        break;
      }
      case STATE.FINISHED_CALCULATION: {
        currentResult.value = `${this.leftOperand} ${this.operation} ${this.rightOperand}`;
        textarea.value = this.result;
        break;
      }
    }
  }

  getCurrentOperand() {
    switch (this.currentState) {
      case STATE.SET_FIRST_OPERAND: {
        return this.leftOperand;
      }
      case STATE.SET_SECOND_OPERAND: {
        return this.rightOperand;
      }
    }
  }

  isEmptyInput() {
    return this.getCurrentOperand() === undefined;
  }

  roundValue(value) {
    return Math.round(value * Math.pow(10, 8)) / Math.pow(10, 8);
  }

  reset() {
    setButtonsState(true);
    this.hasError = false;
    this.currentState = STATE.SET_FIRST_OPERAND;
    this.leftOperand = undefined;
    this.rightOperand = undefined;
    this.operation = undefined;
    this.result = undefined;

    this.display();
  }

  calculate() {
    if (this.rightOperand === zero && this.operation === OPERATIONS.DIVIDE) {
      throw new CalculatorError(resultIsUndefinedErrorMessage);
    }

    const result = this.roundValue(eval(`${this.leftOperand} ${this.operation} ${this.rightOperand}`));

    if (!Number.isFinite(result)) {
      throw new CalculatorError(overflowErrroMessage);
    }

    return result.toString();
  }

  pretifyLeftOperand() {
    if (this.leftOperand.endsWith(delimeter)) {
      this.leftOperand = this.leftOperand.substring(0, this.leftOperand.length - 1);
    }
  }

  pretifyRightOperand() {
    if (this.rightOperand.endsWith(delimeter)) {
      this.rightOperand = this.rightOperand.substring(0, this.rightOperand.length - 1);
    }
  }

  setOperation(operation) {
    switch (this.currentState) {
      case STATE.SET_FIRST_OPERAND: {
        if (!this.leftOperand) {
          this.leftOperand = zero;
        }

        this.pretifyLeftOperand();

        this.rightOperand = this.leftOperand;
        break;
      }
      case STATE.SET_SECOND_OPERAND: {
        this.pretifyRightOperand();
        this.leftOperand = this.calculate();
        this.rightOperand = this.leftOperand;
        break;
      }
      case STATE.FINISHED_CALCULATION: {
        this.leftOperand = this.result;
        this.rightOperand = this.leftOperand;
        break;
      }
    }

    this.currentState = STATE.SET_SECOND_OPERAND_WITH_RESET;
    this.operation = operation;
    this.display();
  }

  handleNumberClick(number) {
    if (this.currentState === STATE.FINISHED_CALCULATION) {
      this.reset();
      this.leftOperand = number;
      this.display();
      return;
    }

    if (this.currentState === STATE.SET_SECOND_OPERAND_WITH_RESET) {
      this.currentState = STATE.SET_SECOND_OPERAND;

      if (this.rightOperand.endsWith(delimeter)) {
        this.rightOperand += number;
      } else {
        this.rightOperand = number;
      }

      this.display();
      return;
    }

    const currentOperand = this.getCurrentOperand();
    this.setOperand(!currentOperand || currentOperand === zero ? number : currentOperand + number);
  }

  handleEqualsClick() {
    if (this.currentState === STATE.FINISHED_CALCULATION) {
      this.leftOperand = this.result;
    }

    if (!this.operation) {
      return;
    }

    if (!this.rightOperand) {
      this.rightOperand = zero;
    }

    this.pretifyRightOperand();
    const result = this.calculate();
    this.currentState = STATE.FINISHED_CALCULATION;
    this.result = result;

    this.display();
  }

  handleArrowClick() {
    const currentOperand = this.getCurrentOperand();

    if (!currentOperand) {
      return;
    }

    const shouldBeReplacedWithDefault =
      (currentOperand.startsWith(minusSign) && currentOperand.length === 2) ||
      currentOperand.length === 1 ||
      currentOperand === `${minusSign}${zero}${delimeter}`;

    this.setOperand(
      shouldBeReplacedWithDefault
        ? undefined
        : textarea.value.substring(0, textarea.value.length - 1)
    );
  }

  handlePointClick() {
    if (this.currentState === STATE.FINISHED_CALCULATION) {
      this.reset();
      this.leftOperand = zero;
      this.currentState = STATE.SET_FIRST_OPERAND;
    }

    const currentOperand = this.getCurrentOperand();

    const isEmptyOrHasNoDelimeter =
      !currentOperand || currentOperand.indexOf(delimeter) === -1;

    if (isEmptyOrHasNoDelimeter) {
      this.setOperand(
        currentOperand ? `${currentOperand}${delimeter}` : `${zero}${delimeter}`
      );
    }
  }

  handlePlusMinusClick() {
    if (this.isEmptyInput()) {
      return;
    }

    const currentOperand = this.getCurrentOperand();

    this.setOperand(
      currentOperand.startsWith(minusSign)
        ? currentOperand.substring(1)
        : `${minusSign}${currentOperand}`
    );
  }

  setError(message) {
    this.hasError = true;
    this.currentState = STATE.FINISHED_CALCULATION;
    this.result = message;
    this.display();

    setButtonsState(false);
  }
}

const numbers = [...document.getElementsByClassName('number')];
const plusOrMinus = document.getElementById('plusOrMinus');
const arrow = document.getElementById('arrow');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const minus = document.getElementById('minus');
const equals = document.getElementById('equals');
const cancel = document.getElementById('cancel');
const point = document.getElementById('point');
const plus = document.getElementById('plus');
const currentResult = document.getElementById('currentResult');
const textarea = document.getElementsByTagName('textarea')[0];
const disableOnErrorButtons = [...document.getElementsByClassName('disable-on-error')];
const buttonsWithResetOnError = [...document.getElementsByTagName('button')]
  .filter((button) => !button.classList.contains('disable-on-error'));

const setButtonsState = (enabled) => {
  disableOnErrorButtons.forEach((button) => {
    button.disabled = !enabled;
  });
};

buttonsWithResetOnError.forEach((button) => {
  button.addEventListener('click', () => {
    if (calculator.hasError) {
      calculator.reset();
    }
  });
});

const withErrorHandler = (func) => {
  return () => {
    try {
      func();
    } catch (ex) {
      if (ex instanceof CalculatorError) {
        calculator.setError(ex.message);
      }
    }
  }
}

numbers.forEach((button) => {
  button.addEventListener('click', withErrorHandler(() => {
    calculator.handleNumberClick(button.innerHTML);
  }));
});

cancel.addEventListener('click', () => calculator.reset());

plusOrMinus.addEventListener('click', () => {
  calculator.handlePlusMinusClick();
});

arrow.addEventListener('click', () => {
  calculator.handleArrowClick();
});

point.addEventListener('click', () => {
  calculator.handlePointClick();
});

const operationEventHandler = (operation) => {
  calculator.setOperation(operation);
};

multiplication.addEventListener('click', () =>
  operationEventHandler(OPERATIONS.MULTIPLY)
);
division.addEventListener('click', () =>
  operationEventHandler(OPERATIONS.DIVIDE)
);
plus.addEventListener('click', () => operationEventHandler(OPERATIONS.PLUS));
minus.addEventListener('click', () => operationEventHandler(OPERATIONS.MINUS));

equals.addEventListener('click', withErrorHandler(() => {
  calculator.handleEqualsClick();
}));

const calculator = new Calculator();
calculator.display();