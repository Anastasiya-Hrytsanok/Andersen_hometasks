isPositiveNumber = (num) => Number.isFinite(num) && num > 0;

isNumberBetween = (num, from, to) =>
  Number.isFinite(num) && num >= from && num <= to;

isStringWithLengthBetween = (str, from, to) =>
  typeof str === 'string' && str.length >= from && str.length <= to;

export class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume;
  #isStarted;
  #mileage;

  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption
  ) {
    this.brand = brand;
    this.model = model;
    this.yearOfManufacturing = yearOfManufacturing;
    this.maxSpeed = maxSpeed;
    this.maxFuelVolume = maxFuelVolume;
    this.fuelConsumption = fuelConsumption;
    this.#currentFuelVolume = 0;
    this.#isStarted = false;
    this.#mileage = 0;
  }

  get brand() {
    return this.#brand;
  }

  set brand(value) {
    if (!isStringWithLengthBetween(value, 1, 50)) {
      throw new Error('Неверное значение');
    }

    this.#brand = value;
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    if (!isStringWithLengthBetween(value, 1, 50)) {
      throw new Error('Неверное значение');
    }

    this.#model = value;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(value) {
    const date = new Date();

    if (!isNumberBetween(value, 1900, date.getFullYear())) {
      throw new Error('Неверное значение');
    }

    this.#yearOfManufacturing = value;
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(value) {
    if (!isNumberBetween(value, 100, 300)) {
      throw new Error('Неверное значение');
    }

    this.#maxSpeed = value;
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(value) {
    if (!isNumberBetween(value, 5, 20)) {
      throw new Error('Неверное значение');
    }

    this.#maxFuelVolume = value;
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(value) {
    if (!isPositiveNumber(value)) {
      throw new Error('Неверное значение');
    }

    this.#fuelConsumption = value;
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  start() {
    if (this.isStarted) {
      throw new Error('Машина уже заведена');
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.isStarted) {
      throw new Error('Машина ещё не заведена');
    }

    this.#isStarted = false;
  }

  fillUpGasTank(fuelLiters) {
    if (!isPositiveNumber(fuelLiters)) {
      throw new Error('Неверное количество топлива для заправки');
    }

    const increasedCurrentFuelVolume = this.currentFuelVolume + fuelLiters;

    if (increasedCurrentFuelVolume > this.maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume = increasedCurrentFuelVolume;
  }

  drive(speed, hoursNumber) {
    if (!isPositiveNumber(speed)) {
      throw new Error('Неверная скорость');
    }

    if (!isPositiveNumber(hoursNumber)) {
      throw new Error('Неверное количество часов');
    }

    if (speed > this.maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (!this.isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const requiredFuelAmount =
      (speed * hoursNumber * this.fuelConsumption) / 100;

    if (requiredFuelAmount > this.currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume = this.currentFuelVolume - requiredFuelAmount;
    this.#mileage = this.mileage + speed * hoursNumber;
  }
}
