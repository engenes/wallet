// Примитивная функция округления до заданной точности
function rounded(number, size = 0) {
  return +number.toFixed(size);
}

function calcRate(rate, value) {
  const number = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  return rounded(value - (rate.type === 'percent' ? (number * rate.size) / 100 : rate.size), 9);
}

function plural(number, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export { calcRate, rounded, plural };
