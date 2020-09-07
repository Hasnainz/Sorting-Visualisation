import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//This imports my predefined components from their respective files.
import Navbar from "./components/Navbar";
import Sort from "./components/Sort";
import Runtimes from "./components/Runtimes";   

function App()
{
  //The Sort, Runtimes and Navbar are all self-defined components with functions and a ui.
  //This means that the program is orientated around these components.
  //These components act like objects although they are called components within react.
  return (
    <Router>
    <div>{/*This is so that the Navbar component is at the top of the entire page. */}
      <Navbar></Navbar>
      <Switch>{/*This routes the path of the URL to the specific pages. */}
          <Route path="/" exact component={Sort}/>
          <Route path="/Sorting-Visualisation" exact component={Sort}/>
          <Route path="/Compare-Runtimes" exact component={Runtimes}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
