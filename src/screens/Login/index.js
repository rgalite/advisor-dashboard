import React, { useCallback } from 'react'
import LoginView from './Login'
import Api from '../../services/api'
import Auth from '../../services/auth'

const TWO_HOURS = 2 * 60 * 60 * 1000

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

          const expirationDate = new Date()
          expirationDate.setTime(expirationDate.getTime() + TWO_HOURS)

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
