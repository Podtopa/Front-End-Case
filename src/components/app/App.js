import React, {useEffect, useState} from "react";
import './App.css';
import {useCourses} from "../../hooks/use-courses";

function App() {
  const courses = useCourses();
  console.log(courses);

  return (
    <div className="App">
      <header className="App-header">
        Hello
      </header>
    </div>
  );
}

export default App;
