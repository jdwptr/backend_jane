import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Navigation from './components/navbar'

import Home from './pages/home'
import Products from './pages/products'

class App extends React.Component {
  render () {
    return (
      <div>
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/product' component={Products}/>
        </Switch>
      </div>
    )
  }
}

export default App
