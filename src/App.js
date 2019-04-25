import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AdvisorsScreen from './screens/Advisors'
import EditAdvisorScreen from './screens/EditAdvisor'

function App() {
  return (
    <div className="App bg-grey-light h-screen">
      <div className="container mx-auto h-full">
        <div className="bg-white px-24" style={{ height: 80 }}>
          Header
        </div>

        <div className="px-24 py-16">
          <Switch>
            <Route path="/" exact component={AdvisorsScreen} />
            <Route
              path="/advisors/:advisorId/edit"
              component={EditAdvisorScreen}
            />
            <Route path="/advisors" exact component={AdvisorsScreen} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App
