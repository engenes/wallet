export default {
  get: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
        data: [
          {
            id: 1,
            name: 'BTC',
            type: 'crypto',
            min_withdraw: 0.001,
            rate: {
              type: 'percent',
              size: 5,
            },
          }, {
            id: 15,
            name: 'USD',
            type: 'fiat',
            min_withdraw: 100,
            rate: {
              type: 'percent',
              size: 5,
            },
          }, {
            id: 4,
            name: 'DOGE',
            type: 'crypto',
            min_withdraw: 5,
            rate: {
              type: 'fix',
              size: 0.5,
            },
          }, {
            id: 5,
            name: 'LTC',
            type: 'crypto',
            min_withdraw: 1,
            rate: {
              type: 'fix',
              size: 0.5,
            },
          }, {
            id: 17,
            name: 'SHIB',
            type: 'crypto',
            min_withdraw: 500,
            rate: {
              type: 'fix',
              size: 10,
            },
          }, {
            id: 6,
            name: 'RUB',
            type: 'fiat',
            min_withdraw: 10000,
            rate: {
              type: 'percent',
              size: 0,
            },
          }, {
            id: 13,
            name: 'BNB',
            type: 'crypto',
            min_withdraw: 0.15,
            rate: {
              type: 'fix',
              size: 0.01,
            },
          },
        ],
      });
    }, 350);
  }),
};
