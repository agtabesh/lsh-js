const murmurHash = require('murmurhash-native').murmurHash128x86
const { range } = require('./Util')

class Hash {
  static get inject () {
    return [
      'App/Storage',
      'App/RandomSeed',
      'App/Config'
    ]
  }

  /**
   * @method constructor
   *
   * @param {*} size
   *
   * @return {void}
   */
  constructor (storage, randomSeed, config) {
    this._storage = storage
    this._randomSeed = randomSeed
    this._config = config
    this._size = config.numberOfHashFunctions || 120
    this._min = 0
    this._max = 1000000000
  }

  /**
   * @method _getHash
   *
   * @param {Number} ith
   * @param {String} value
   *
   * @return {String}
   */
  _getHash (ith, value) {
    const x = this._randomSeed.get(ith)
    return murmurHash(value, (x * x + x) / 4294967311)
  }

  /**
   * @method _getMinhash
   *
   * @param {Array} hashes
   *
   * @return {String}
   */
  _getMinhash (minhash, hash) {
    return hash < minhash ? hash : minhash
  }

  /**
   * @method getSigniture
   *
   * @param {Array} shingles
   *
   * @return {Array}
   */
  getSigniture (shingles) {
    return range(0, this._size - 1)
      .map(i => shingles.map(shingle => this._getHash(i, shingle))
        .reduce(this._getMinhash))
  }
}

module.exports = Hash
