

const { ioc } = require('@adonisjs/fold')
const storages = require('./Storages')

class StorageManager {
  static get inject () {
    return ['App/Config']
  }

  constructor (config) {
    this._config = config
    this._storages = {}
  }

  extend (key, implementation) {
    this._storages[key] = implementation
  }

  getStorageInstance () {
    const { storage } = this._config
    const storageClass = storages[storage] || this._storages[storage]
    if (!storageClass) {
      throw new Error(`${storage} is not a valid storage`)
    }
    return ioc.make(storageClass)
  }
}

module.exports = StorageManager
