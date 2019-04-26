import React, { useCallback, useState } from 'react'
import Logo from '../../components/Logo'

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
    <div className="h-screen bg-grey-light flex items-center justify-center">
      <div className="bg-white container mx-auto p-32 flex justify-center">
        <div className="mx-auto">
          <div className="pb-16 text-center">
            <Logo />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="pb-8">
              <label className="">
                <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
                  Email
                </span>
                <input
                  type="email"
                  onChange={handleEmailChange}
                  className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
                />
              </label>
            </div>

            <div className="pb-8">
              <label className="">
                <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
                  Password
                </span>
                <input
                  type="password"
                  onChange={handlePasswordChange}
                  value={password || ''}
                  className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
                />
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue text-white h-40 w-200 rounded hover:bg-blue-dark"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
