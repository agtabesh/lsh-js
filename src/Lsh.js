class Lsh {
  static get inject () {
    return [
      'App/Config',
      'App/Storage',
      'App/Shingle',
      'App/Hash'
    ]
  }

  /**
   *
   * @param {Config} config
   * @param {Storage} storage
   * @param {Shingle} shingle
   * @param {Hash} hash
   */
  constructor (config, storage, shingle, hash) {
    this._storage = storage
    this._config = config
    this._shingle = shingle
    this._hash = hash
  }

  /**
   * @method addDocument
   *
   * @param {Number} id
   * @param {String} text
   *
   * @return {void}
   *
   * @example
   * ```js
   * lsh.addDocument(1, 'A sample text')
   * ```
   */
  addDocument (id, text) {
    this._storage.set(`document:${id}`, text)
    const shingles = this._shingle.shingle(text)
    const signiture = this._hash.getSigniture(shingles)
    this._storage.set(`signiture:${id}`, signiture)
    signiture.map(sign => this._storage.add(sign, id))
  }

  /**
   * @method getDocument
   *
   * @param {Number} id
   *
   * @return {String}
   */
  getDocument (id) {
    return this._storage.get(`document:${id}`)
  }

  /**
   * @method _getSigniture
   *
   * @param {Object} q
   * @param {Number} q.id
   * @param {String} q.text
   *
   * @return {Array}
   * @throws {Error} If no input speified
   */
  _getSigniture (q) {
    const { id, text } = q
    if (id) {
      return this._storage.get(`signiture:${id}`)
    } if (text) {
      const shingles = this._shingle.shingle(text)
      return this._hash.getSigniture(shingles)
    }
    throw new Error('No input specified! Please specify an input to search for.')
  }

  /**
   * @method query
   *
   * @param {Object} q
   * @param {Number} q.id
   * @param {String} q.text
   * @param {Number} q.bucketSize
   *
   * @return {Array}
   */
  query (q = {}) {
    const { bucketSize = 1 } = q
    const signiture = this._getSigniture(q)
    const docs = new Set()
    for (let i = 0, len = signiture.length - bucketSize + 1; i < len; i += bucketSize) {
      const candidates = this._storage.get(signiture[i]) || []
      for (let j = i + 1; j < i + bucketSize; j += 1) {
        const arr = this._storage.get(signiture[j]) || []
        candidates.filter(x => arr.includes(x))
      }
      candidates.map(x => docs.add(x))
    }
    return [...docs]
  }

  /**
   * @method clear
   *
   * @return {void}
   */
  clear () {
    this._storage.clear()
  }
}

module.exports = Lsh
