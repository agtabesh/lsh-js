const { ioc } = require('@adonisjs/fold')

ioc.autoload(`${__dirname}`, 'App')

class Singleton {
  /**
   * @method constructor
   *
   * @param {Object} config
   *
   * @return {Lsh}
   */
  constructor (config) {
    const _config = Object.assign({
      storage: 'memory',
      shingleSize: 5,
      numberOfHashFunctions: 120
    }, config)

    if (!Singleton.instance) {
      ioc.bind('App/Config', () => _config)
      ioc.bind('App/Storage', () => {
        const storageManager = ioc.make('App/StorageManager')
        return storageManager.getStorageInstance()
      })
      return ioc.make('App/Lsh')
    }
  }

  /**
   * @method getInstance
   *
   * @param {Object} config
   *
   * @return {Lsh}
   */
  static getInstance (config) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(config)
    }
    return Singleton.instance
  }
}

module.exports = Singleton
