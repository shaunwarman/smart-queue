const test = require('ava');

const SmartQueue = require('..');

test('init no options', t => {
  const queue = new SmartQueue();
  t.true(queue instanceof SmartQueue);
});

test('init empty options', t => {
  const queue = new SmartQueue({});
  t.true(queue instanceof SmartQueue);
});

test('init defaults', t => {
  const queue = new SmartQueue({});
  t.true(queue instanceof SmartQueue);
  t.true(queue.retries === 3);
  t.true(queue._concurrency === Infinity);
});

test('init options', t => {
  const queue = new SmartQueue({ concurrency: 3, retries: 5 });
  t.true(queue instanceof SmartQueue);
  t.true(queue.retries === 5);
  t.true(queue._concurrency === 3);
});

test('default error handler', t => {
  const queue = new SmartQueue({});
  t.true(queue.errorHandler === queue.defaultErrorHandler);
});

test('custom error handler', t => {
  const queue = new SmartQueue({
    errorHandler: () => {
      throw new Error('test error');
    }
  });

  try {
    queue.errorHandler();
  } catch (err) {
    t.true(err.message === 'test error');
  }
});

test('enqueue', t => {
  const queue = new SmartQueue({});

  const asyncTask = () => {
    return new Promise((resolve, reject) => {
      if (queue.test) reject();
      queue.test = 1;
      resolve();
    });
  };

  t.true(queue.test !== 1);
  queue.enqueue(asyncTask);
  setTimeout(() => {
    t.true(queue.test === 1);
  }, 1000);
});
