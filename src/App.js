import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from './services/auth'

import AdvisorsScreen from './screens/Advisors'
import EditAdvisorScreen from './screens/EditAdvisor'
import NewAdvisorScreen from './screens/NewAdvisor'
import PreviewAdvisorScreen from './screens/PreviewAdvisor'

import Logo from './components/Logo'

function App() {
  const currentUser = Auth.getUser()
  return (
    <div className="App bg-grey-light min-h-screen">
      <div style={{ height: 80 }} className="text-blue-darkest mb-12">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <Logo />
          </div>

          <div className="text-right">
            Hello {currentUser.name},
            <br />({currentUser.email})
          </div>
        </div>
      </div>

      <div className="container mx-auto h-full">
        <div>
          <Switch>
            <Route path="/" exact component={AdvisorsScreen} />
            <Route path="/advisors/new" component={NewAdvisorScreen} />
            <Route
              path="/advisors/:advisorId/preview"
              component={PreviewAdvisorScreen}
              exact
            />
            <Route path="/advisors/:advisorId" component={EditAdvisorScreen} />
            <Route path="/advisors/" component={AdvisorsScreen} exact />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App
