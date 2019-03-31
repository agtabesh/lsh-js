const { range } = require('./Util')

class Shingle {
  static get inject () {
    return [
      'App/Config'
    ]
  }

  /**
   * @method constructor
   *
   * @param {Config} config
   *
   * @return {void}
   */
  constructor (config) {
    this._size = config.shingleSize || 3
  }

  /**
   * @method shingle
   *
   * @param {String} document
   *
   * @return {Array}
   */
  shingle (document) {
    return range(0, document.length - this._size)
      .map((shingle, i) => document.slice(i, i + this._size))
  }
}

module.exports = Shingle
