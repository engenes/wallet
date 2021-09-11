const errors = {
  required: 'Поле "field_name" обязательно для заполнения',
  minLength: 'Длина поля "field_name" должна быть больше param_value',
  maxLength: 'Длина поля "field_name" должна быть меньше param_value',
  startStr: 'Поле "field_name" должно начинаться с param_value',
  equality: 'Поле "field_name" должно иметь длину param_value',
};

function plural(number, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const getErrors = function (field_name, v) {
  const flattenParams = v.$flattenParams();
  const errors_array  = [];

  flattenParams.forEach((param) => {
    let output_str = errors[param.name];
    if (!v[param.name]) {
      if (output_str) {
        output_str = output_str.replace('field_name', field_name);
        if ('max' in param.params) {
          output_str = output_str.replace('param_value', `${param.params.max} ${plural(param.params.max, ['символ', 'символа', 'символов'])}`);
        }
        if ('min' in param.params) {
          output_str = output_str.replace('param_value', `${param.params.min} ${plural(param.params.min, ['символ', 'символа', 'символов'])}`);
        }
        if ('start' in param.params) {
          output_str = output_str.replace('param_value', param.params.start);
        }
        if ('length' in param.params) {
          output_str = output_str.replace('param_value', `${param.params.length} ${plural(param.params.length, ['символ', 'символа', 'символов'])}`);
        }
        errors_array.push(output_str);
      }
    }
  });
  return errors_array;
};

export default getErrors;
