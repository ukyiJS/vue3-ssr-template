/* eslint-disable no-console */
import chalk, { ForegroundColor } from 'chalk';

export type LoggerType = 'LOG' | 'WARN' | 'DEBUG' | 'INFO' | 'ERROR';

export default class Logger {
  static get #getDate() {
    const date = new Date();
    const dateList = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];
    const [year, month, day, hours, minutes, seconds, milliseconds] = dateList.map(date => `${date}`.padStart(2, '0'));
    return `${[year, month, day].join('/')}, ${[hours, minutes, seconds, milliseconds].join(':')}`;
  }

  static #getColor(type: LoggerType): ForegroundColor {
    switch (type) {
      case 'WARN':
        return 'yellow';
      case 'DEBUG':
        return 'magenta';
      case 'INFO':
        return 'cyan';
      case 'ERROR':
        return 'red';
      case 'LOG':
      default:
        return 'green';
    }
  }

  static #logger(context: string, message: unknown, type: LoggerType, stack?: unknown) {
    const loggerColor = chalk[this.#getColor(type)];
    const ctx = context ? chalk.yellow(`[${context}]`) : '';
    const msg = message || context;
    const messageType = Array.isArray(msg) ? 'array' : typeof msg;
    const log = console.log.bind(null, loggerColor('[server] -'), this.#getDate, loggerColor(type.padStart(5, ' ')), ctx);

    (() => {
      switch (messageType) {
        case 'string':
        case 'number':
        case 'boolean':
          return log(loggerColor(msg));
        default:
          return log(`${loggerColor(messageType)}:`, msg);
      }
    })();
    if (stack) console.error(chalk.red(stack));
  }

  static log(message: unknown): void;
  static log(context: string, message: unknown): void;
  static log(context: string, message?: unknown): void {
    this.#logger(context, message, 'LOG');
  }

  static warn(message: unknown): void;
  static warn(context: string, message: unknown): void;
  static warn(context: string, message?: unknown): void {
    this.#logger(context, message, 'WARN');
  }

  static debug(message: unknown): void;
  static debug(context: string, message: unknown): void;
  static debug(context: string, message?: unknown): void {
    this.#logger(context, message, 'DEBUG');
  }

  static info(message: unknown): void;
  static info(context: string, message: unknown): void;
  static info(context: string, message?: unknown): void {
    this.#logger(context, message, 'INFO');
  }

  static error(message: unknown): void;
  static error(context: string, message: unknown): void;
  static error(context: string, message: unknown, stack: unknown): void;
  static error(context: string, message?: unknown, stack?: unknown): void {
    this.#logger(context, message, 'ERROR', stack);
  }

  static startServer(port: number | string) {
    const log = console.log.bind(null, '\n  ');
    const server = process.env.VITE ? 'dev server' : 'server';

    log(chalk.green(`🚀 ${server} running at: `));
    log(`> ${chalk.underline(`http://localhost:${port}`)}`);
  }
}
