import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Navigation from './components/navbar'

import Home from './pages/home'
import Products from './pages/products'
import LoginPage from './pages/login'
import Register from './pages/register'

// NOTE import action
import { keepLogin } from './action'

// NOTE import connect
import { connect } from 'react-redux'

class App extends React.Component {
  componentDidMount () {
    this.props.keepLogin()
  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/product' component={Products} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    )
  }
}

export default connect (null, { keepLogin })(App)
