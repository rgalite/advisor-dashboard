import Auth from '../services/auth'

class Api {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL
  }

  call(path, options = {}) {
    const accessToken = Auth.getAccessToken()

    options.headers = Object.assign({}, options.headers, {
      'content-type': 'application/json',
      Authorization: accessToken
        ? ['Bearer', accessToken].join(' ')
        : undefined,
    })

    return fetch([this.baseUrl, path].join(''), options).then(
      this.parseResponse
    )
  }

  parseResponse = response => {
    if (response.ok) {
      return response.json()
    }

    const jsonError = response.json()
    const error = new Error('Api error', jsonError)
    error.apiError = jsonError

    return Promise.reject(error)
  }
}

export default new Api()
