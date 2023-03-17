import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import {AllCoursesPage} from "../all-courses-page/AllCoursesPage";
import {CoursePage} from "../coure-page/CoursePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/course/:id/lesson/:lessonId", "/course/:id"]}>
          <CoursePage/>
        </Route>
        <Route path="/">
          <AllCoursesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
