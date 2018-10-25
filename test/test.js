const test = require('ava');

const SmartQueue = require('..');

test('init', t => {
  const queue = new SmartQueue();
  t.true(queue instanceof SmartQueue);
});
