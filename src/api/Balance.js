/**
 * Здесь предполагаю что статусы в ответном сообщении от сервера, могут быть только true, либо false.
 * Если сервер вообще не ответ, или вернет некорректные данные, то их обработаю еще в интерцепторе, в API верну уже обработанный статус
 * Поэтому никаких доп. обработок исключений на этом этапе нет, если того не потребует задача.
 * А промис пишу чтобы потом имитировать асинхронное выполнение запросов
 */

export default {
  get: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
        data: [
          {
            id: 1,
            balance: 0.01,
          }, {
            id: 15,
            balance: 100,
          },
        ],
      });
    }, 500);
  }),
  // eslint-disable-next-line no-unused-vars
  send: (data) => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
      });
    }, 1000);
  }),
};
