# concurrent-queue

[![build status](https://img.shields.io/travis/shaunwarman/smart-queue.svg)](https://travis-ci.com/shaunwarman/smart-queue)
[![code coverage](https://img.shields.io/codecov/c/github/shaunwarman/smart-queue.svg)](https://codecov.io/gh/shaunwarman/smart-queue)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/shaunwarman/smart-queue.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/smart-queue.svg)](https://npm.im/smart-queue)

> A priority queue with configurable retry and concurrency


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Options](#options)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install smart-cq
```

[yarn][]:

```sh
yarn add smart-cq
```


## Usage

```js
const CQueue = require('smart-cq');

const cqueue = new CQueue({
  concurrency: 10,
  retries: 3
});

const asyncTask = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

cqueue.enqueue(asyncTask)
```


## Options

* `concurrency` - (default: `Infinity`) - concurrent tasks to run
* `retries` - (default: `3`) - retry attempts on failed tasks


## Contributors

| Name             | Website                   |
| ---------------- | ------------------------- |
| **Shaun Warman** | <https://shaunwarman.com> |


## License

[MIT](LICENSE) © [Shaun Warman](https://shaunwarman.com)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
