import express from "express";

export class Server {
  /**
   * @param {{port: string}} config
   * @param  {...any} middlewares
   */

  constructor(config) {
    this.config = config;
    this.#init();
  }

  #init() {
    this.app = express();
  }

  /**
   * @description Set middlewares for the express app
   * @param  {...any} middlewares
   */

  setMiddlewares(...middlewares) {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  listen(cb) {
    this.app.listen(this.config.port, cb);
  }
}
