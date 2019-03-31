class RandomSeed {
  static get inject () {
    return [
      'App/Storage',
      'App/Config'
    ]
  }

  /**
   * @method constructor
   *
   * @param {Storage} storage
   * @param {Config} config
   *
   * @return {void}
   */
  constructor (storage, config) {
    this._storage = storage
    this._size = config.numberOfHashFunctions || 120
    this._min = 0
    this._max = 1000000000
  }

  /**
   * @method _generateRandomNumber
   *
   * @return {Number}
   */
  _generateRandomNumber () {
    return Math.round(Math.random() * (this._max - this._min) + this._min)
  }

  /**
   * @method get
   *
   * @param {Number} size
   *
   * @return {Array}
   *
   * @example
   * ```js
   * random.get(120)
   * ```
   */
  get (ith) {
    const randomNumbers = this._storage.get('randomNumbers') || []
    if (randomNumbers.length) {
      return this._storage.get('randomNumbers')[ith]
    }
    for (let i = randomNumbers.length; i < this._size; i += 1) {
      randomNumbers.push(this._generateRandomNumber())
    }
    this._storage.set('randomNumbers', randomNumbers)
    return randomNumbers[ith]
  }
}

module.exports = RandomSeed
