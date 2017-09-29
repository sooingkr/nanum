import { user1 } from './mock/user-info';

export const serverTest = {
  get: (url, params) => {
    const res = {data: undefined};
    switch (url) {
      case '/api/user/1':
        res.data = user1;
        break;
    }

    return Promise.resolve(res);
  },
  post: (url, params) => {
    const res = {data: undefined};
    switch (url) {
      case '/api/user/1':
        res.data = {};
        break;
    }

    return Promise.resolve(res);
  },
  put: (url, params) => {
    const res = {data: undefined};
    switch (url) {
      case '/api/user/1':
        res.data = {};
        break;
    }

    return Promise.resolve(res);
  },
  delete: (url, params) => {
    const res = {data: undefined};
    switch (url) {
      case '/api/user/1':
        res.data = {};
        break;
    }

    return Promise.resolve(res);
  }
};