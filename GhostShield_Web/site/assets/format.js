// Display helpers only. Never pass formatted values into inference or metrics.
const fixed = (min, max = min) => new Intl.NumberFormat('en-US', {
  useGrouping: false, minimumFractionDigits: min, maximumFractionDigits: max,
});
const integer = fixed(0);
const millions = fixed(0, 2);
const percent = new Intl.NumberFormat('en-US', {
  style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2,
});
const errors = [fixed(4), fixed(5), fixed(6)];

export const format = {
  count: value => value >= 1e6 ? millions.format(value / 1e6) + 'M' : integer.format(value),
  index: value => integer.format(value),
  percent: value => percent.format(value),
  rocAuc: value => fixed(4).format(value),
  threshold: value => fixed(5).format(value),
  error(value) {
    if (value === 0) return '0';
    if (value < 0.00001) return value.toExponential(2);
    return errors[value >= 0.01 ? 0 : value >= 0.001 ? 1 : 2].format(value);
  },
};
