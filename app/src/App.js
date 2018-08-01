import React, { Component } from 'react'
import './App.css'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home'
import Resources from './pages/resources'
import ViewResource from './pages/resources/view'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/resources" component={Resources} />
          <Route exact path="/resources/:id" component={ViewResource} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
