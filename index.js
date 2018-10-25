const PQueue = require('p-queue');
const pretry = require('p-retry');

class SmartQueue extends PQueue {
  constructor(options) {
    super(options);
    const {
      retries = 3,
      errorHandler = this.defaultErrorHandler,
      retryOptions = {}
    } = options;

    this.errorHandler = errorHandler;
    this.retries = retries;
    this.retryOptions = retryOptions;
  }

  enqueue(task) {
    const rTask = () =>
      pretry(task, {
        onFailedAttempt: this.errorHandler.bind(this),
        retries: this.retries,
        ...this.retryOptions
      });

    this.add(rTask);
  }

  defaultErrorHandler(error) {
    console.log(
      `Attempt ${error.attemptNumber} failed. There are ${
        error.attemptsLeft
      } attempts left.`
    );
  }
}

module.exports = SmartQueue;
