import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    // this.get('/posts2', () => {
    //   return data;
    // });

  },
});
