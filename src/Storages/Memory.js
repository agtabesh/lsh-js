class Storage {
  constructor () {
    this._values = new Map()
  }

  set (key, value) {
    return this._values.set(key, value)
  }

  get (key) {
    return this._values.get(key)
  }

  add (key, value) {
    if (!this.has(key)) {
      this.set(key, [])
    }
    this.get(key).push(value)
  }

  has (key) {
    return !!(this._values.get(key))
  }

  all () {
    return this._values
  }

  clear () {
    this._values = new Map()
  }
}

module.exports = Storage
