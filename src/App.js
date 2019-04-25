import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Advisors from './screens/Advisors'

function App() {
  return (
    <div className="App bg-grey-light h-screen">
      <div className="container mx-auto h-full">
        <div className="bg-white px-24" style={{ height: 80 }}>
          Header
        </div>

        <div className="px-24 py-16">
          <Switch>
            <Route path="/" component={Advisors} />
            <Route path="/advisors" component={Advisors} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App
