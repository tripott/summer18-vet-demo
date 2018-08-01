import React, { Component } from "react"
import "./App.css"
import { Switch, BrowserRouter, Route } from "react-router-dom"
import Home from "./pages/home"
import EventNew from "./pages/event-new"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/events/new" component={EventNew} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
