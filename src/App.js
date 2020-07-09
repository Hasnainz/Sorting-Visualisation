import React from "react";
import Navbar from "./components/Navbar";
import Sort from "./components/Sort";
import Runtimes from "./components/Runtimes";   
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App()
{
  return (
    <Router>
    <div className="App">
      <Navbar></Navbar>
      <Switch>
          <Route path="/" exact component={Sort} className="align"/>
          <Route path="/Sorting-Visualisation" component={Sort} className="align"/>
          <Route path="/Compare-Runtimes" component={Runtimes} className="align"/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
