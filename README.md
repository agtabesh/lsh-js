# Locality-Sensitive Hashing

[Locality-sensitive hashing](https://en.wikipedia.org/wiki/Locality-sensitive_hashing)
(LSH) reduces the dimensionality of high-dimensional data and hashes input items so that similar items map to the same “buckets” with high probability (the number of buckets being much smaller than the universe of possible input items).


[![npm (scoped)](https://img.shields.io/badge/npm-v0.1.0-brightgreen.svg)](https://www.npmjs.com/package/lsh)
[![npm (scoped)](https://img.shields.io/badge/license-MIT-red.svg)](https://www.npmjs.com/package/@agtabesh/lsh)
[![npm (scoped)](https://img.shields.io/badge/repository-github-lightgrey.svg)](https://www.npmjs.com/package/@agtabesh/lsh)

## Install

```
$ npm install lsh --save
```

## Usage

To figure out how to use this package please take a look at test files

```js
const RandomWords = require('random-words')
const Lsh = require('lsh')

const config = {
  storage: 'memory',
  shingleSize: 5,
  numberOfHashFunctions: 120
}
const lsh = Lsh.getInstance(config)

const numberOfDocuments = 100
const documents = []

// generate random documents containing 100 words each
for (let i = 0; i < numberOfDocuments; i += 1) {
  documents.push(RandomWords({ min: 100, max: 100 }).join(' '))
}

// add documents just created to LSH with their id
for (let i = 0; i < numberOfDocuments; i += 1) {
  lsh.addDocument(i, documents[i])
}

// search for a specific document with its id and custom bicketSize
// you can also perform a query using a string by passing text instead of id
// bucket size are dynamic. feel free to change it to find proper one
const q = {
  id: 1,
  // text: 'this is a sample text to search for',
  bucketSize: 6
}
const result = lsh.query(q)

// this will print out documents which are candidates to be similar to the one we are looking for
console.log(result)
```

It's incredibly fast. No matter how many documents you have, time complexity is always constant. Its Dependencies are injected by using [@adonisjs/fold](https://www.npmjs.com/package/@adonisjs/fold) which allows us to extend the package freely. There is only one storage and I'll be appreciated if you would implement the other storages such as [Redis](https://redis.io/) and submit a pull request.

In this package, [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash), a non-cryptographic hash function which is faster than cryptographic hash function, is used.

## Running tests

You can run the test suite using the following commands:
```
npm test
```

**All contributions are welcome. Please ensure that the tests are passing when submitting a pull request. If you're adding new features to this package, please include tests.**


## Release History
0.1.0 - Initial release, basic functionality and supports memory storage.
