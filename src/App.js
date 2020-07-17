import React from "react";
import Navbar from "./components/Navbar";
import Sort from "./components/Sort";
import Runtimes from "./components/Runtimes";   
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App()
{
  return (
    <Router>
    <div>
      <Navbar></Navbar>
      <Switch>
          <Route path="/Sorting-Visualisation" exact component={Sort}/>
          <Route path="/Compare-Runtimes" exact component={Runtimes}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
