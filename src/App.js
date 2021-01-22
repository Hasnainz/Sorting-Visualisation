import React from "react";
import SortingMain from "./components/ArraySorting/SortingMain";
import PathfindingMain from "./components/PathfindingMain";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

function App()
{
  return (
    <Router>
      <div>
      <nav>
          <ul>
            <li>
              <Link to="/sort">Array Sorting</Link>
            </li>
            <li>
              <Link to="/path">Path Finding</Link>
            </li>
          </ul>
      </nav>
      <Switch>
          <Route path="/sort">
            <SortingMain/>
          </Route>
        
          <Route path="/path">
            <PathfindingMain/>
          </Route>

          <Route path="/">
            <SortingMain/>
          </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
