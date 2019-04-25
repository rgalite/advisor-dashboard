import React, { useCallback, useState } from 'react'

export default function LoginView({ onSubmit }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleEmailChange = useCallback(
    ({ target }) => setEmail(target.value),
    []
  )
  const handlePasswordChange = useCallback(
    ({ target }) => setPassword(target.value),
    []
  )
  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      onSubmit({ email, password })
    },
    [email, onSubmit, password]
  )

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" onChange={handleEmailChange} value={email || ''} />
        <input
          type="password"
          onChange={handlePasswordChange}
          value={password || ''}
        />

        <button type="submit">Log in</button>
      </form>
    </div>
  )
}
