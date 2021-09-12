// Примитивная функция округления до заданной точности
function rounded(number, size = 0) {
  return +number.toFixed(size);
}

function calcRate(rate, value) {
  const number = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  return rounded(value - (rate.type === 'percent' ? (number * rate.size) / 100 : rate.size), 9);
}

export { calcRate, rounded };
