import React, {useEffect, useState} from "react";
import './App.css';
import {useCourses} from "../../hooks/use-courses";
import {AllCoursesPage} from "../all-courses-page/AllCoursesPage";

function App() {
  const courses = useCourses();
  console.log(courses);

  return (
    <div>
      <AllCoursesPage/>
    </div>
  );
}

export default App;
