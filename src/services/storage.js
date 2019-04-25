const STORAGE_KEY = '@advisor'

class Storage {
  formatKey(keyName) {
    return [STORAGE_KEY, keyName].join(':')
  }

  setItem(keyName, keyValue) {
    localStorage.setItem(this.formatKey(keyName), JSON.stringify(keyValue))
  }

  getItem(keyName) {
    const value = localStorage.getItem(this.formatKey(keyName))
    return !!value && JSON.parse(value)
  }

  removeItem(keyName) {
    return localStorage.removeItem(this.formatKey(keyName))
  }

  hasKey(keyName) {
    return !!localStorage.getItem(this.formatKey(keyName))
  }
}

export default new Storage()
