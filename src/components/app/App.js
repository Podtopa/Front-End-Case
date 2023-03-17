import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import {AllCoursesPage} from "../all-courses-page/AllCoursesPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/course/:id">
          123
        </Route>
        <Route path="/">
          <AllCoursesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
