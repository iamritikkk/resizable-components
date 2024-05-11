export class ErrorMiddleware {
  static async error(error, req, res, next) {
    const code = error?.code ?? 500;
    const message = error?.message ?? `Internal Server Error`;
    const timestamp = new Date().getTime();

    console.log(`Error: ${message} - ${code}\nmessage stack: `, error);
    return res
      .status(code)
      .json({ status: { code, message }, timestamp: timestamp });
  }
}
