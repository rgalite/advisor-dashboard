import React, { useCallback } from 'react'
import jwtDecode from 'jwt-decode'

import LoginView from './Login'
import Api from '../../services/api'
import Auth from '../../services/auth'

export default function LoginScreen({ history }) {
  const handleSubmit = useCallback(
    ({ email, password }) => {
      ;(async () => {
        console.log('submit', email, password)
        try {
          const { user, token } = await Api.call('/api/v1/users/login', {
            method: 'POST',
            body: JSON.stringify({
              user: {
                email,
                password,
              },
            }),
          })

          const decodedToken = jwtDecode(token)
          const expirationDate = new Date(decodedToken.exp * 1000)

          Auth.saveToken({ value: token, expirationDate: expirationDate })
          Auth.saveUser(user)

          history.push('/')
        } catch (error) {
          console.error(error)
        }
      })()
    },
    [history]
  )

  return <LoginView onSubmit={handleSubmit} />
}
