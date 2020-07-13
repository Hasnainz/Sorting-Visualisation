import React from "react";
import Navbar from "./components/Navbar";
import Sort from "./components/Sort";
import Runtimes from "./components/Runtimes";   
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

function App()
{
  return (
    <Router>
    <div className="App">
      <Navbar></Navbar>
      <Switch>
          <Route path="/" exact component={Sort}/>
          <Route path="/Sorting-Visualisation" component={Sort}/>
          <Route path="/Compare-Runtimes" component={Runtimes}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
