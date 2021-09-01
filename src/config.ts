export const Configuration = {
  development: {
    Limit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
    endPoint: '/api/v1',
    secretOrPrivateKey: '7e9c48c1-d712-48cb-8de2-8f732bf7a07b',
    expireIn: 60 * 60 * 4 * 1000,
  },
  production: {
    Limit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
    endPoint: '/api/v1',
    secretOrPrivateKey: '6765582d-45ac-4887-9194-891603f3dd1a',
    expireIn: 60 * 60 * 4 * 1000,
  },
  test: {
    Limit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
    endPoint: '/api/v1',
    secretOrPrivateKey: '7e9c48c1-d712-48cb-8de2-8f732bf7a07b',
    expireIn: 60 * 60 * 4 * 1000,
  },
};
