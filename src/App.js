import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/DisplayTrack";
import Guitars from "./guitars.jpg";
// import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  style = {
    backgroundImage: `url(${Guitars})`
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App" style={this.style}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={Play} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
