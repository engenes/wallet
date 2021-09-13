import { plural } from '@/helpers/helpers';

const format = require('format-number');

const errors = {
  required: 'Обязательно для заполнения',
  minLength: 'Длина должна быть больше param_value',
  maxLength: 'Длина должна быть меньше param_value',
  minValue: 'Значение не должно быть меньше param_value',
  maxValue: 'Значение не должно быть больше param_value',
  startStr: 'Должно начинаться с param_value',
  equality: 'Должно иметь длину param_value',
};

const getErrors = function (field_name, v) {
  const flattenParams = v.$flattenParams();
  const errors_array  = [];
  flattenParams.forEach((param) => {
    let output_str = errors[param.name];
    if ( ! v[param.name]) {
      if (output_str) {
        if ('max' in param.params) {
          switch (param.name) {
            case 'maxLength':
              output_str = output_str.replace(
                  'param_value',
                  `${format({ integerSeparator: ' ', decimal: ',' })(param.params.max)} ${plural(param.params.max, ['символ', 'символа', 'символов'])}`,
              );
              break;
            case 'maxValue':
              output_str = output_str.replace('param_value', format({ integerSeparator: ' ', decimal: ',' })(param.params.max));
              break;
          }
        }
        if ('min' in param.params) {
          switch (param.name) {
            case 'minLength':
              output_str = output_str.replace(
                  'param_value',
                  `${format({ integerSeparator: ' ', decimal: ',' })(param.params.min)} ${plural(param.params.min, ['символ', 'символа', 'символов'])}`,
              );
              break;
            case 'minValue':
              output_str = output_str.replace('param_value', format({ integerSeparator: ' ', decimal: ',' })(param.params.min));
              break;
          }
        }
        if ('start' in param.params) {
          output_str = output_str.replace('param_value', param.params.start);
        }
        if ('length' in param.params) {
          output_str = output_str.replace(
              'param_value',
              `${format({ integerSeparator: ' ', decimal: ',' })(param.params.length)} ${plural(param.params.length, ['символ', 'символа', 'символов'])}`,
          );
        }
        errors_array.push(output_str);
      }
    }
  });
  return errors_array;
};

export default getErrors;
