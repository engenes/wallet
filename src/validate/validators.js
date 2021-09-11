import { helpers } from 'vuelidate/lib/validators';

const startStr = (str) => helpers.withParams({
      type: 'startStr',
      start: str,
    },
    (value) => !helpers.req(value) || value.startsWith(str));

const equality = (len) => helpers.withParams({
      type: 'length',
      length: len,
    },
    (value) => !helpers.req(value) || value.length === len);
export { startStr, equality };
