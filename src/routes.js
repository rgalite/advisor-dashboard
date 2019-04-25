import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import App from './App'
import LoginScreen from './screens/Login'
import Auth from './services/auth'

export default function makeRoutes() {
  return (
    <Switch>
      <Route path="/login" component={LoginScreen} />
      <Route
        path="/"
        render={props =>
          Auth.isLoggedIn() ? <App /> : <Redirect to="/login" />
        }
      />
    </Switch>
  )
}
