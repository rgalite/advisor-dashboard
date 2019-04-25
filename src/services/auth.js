import Storage from './storage'

const STORAGE_TOKEN_KEY = 'token'
const STORAGE_EXPIRATION_DATE_KEY = 'expiration_token_date'
const STORAGE_USER_KEY = 'user'

class Auth {
  getAccessToken() {
    return Storage.getItem(STORAGE_TOKEN_KEY)
  }

  isLoggedIn() {
    return new Date(Storage.getItem(STORAGE_EXPIRATION_DATE_KEY)) > new Date()
  }

  saveToken({ value, expirationDate }) {
    Storage.setItem(STORAGE_TOKEN_KEY, value)
    Storage.setItem(STORAGE_EXPIRATION_DATE_KEY, expirationDate)
  }

  saveUser(user) {
    Storage.setItem(STORAGE_USER_KEY, user)
  }
}

export default new Auth()
