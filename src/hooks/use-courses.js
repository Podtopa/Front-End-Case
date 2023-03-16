import {useEffect, useState} from "react";
import {API_PREFIX, USE_MOCKS} from "../const";
import {useToken} from "./use-token";
import coursesMock from "../mocks/courses.json";

export function useCourses () {
  const [courses, setCourses] = useState([]);
  const token = useToken();

  useEffect(() => {
    if (token && !courses.length) {
      fetch(`${API_PREFIX}/core/preview-courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => {
          return response.json();
        })
        .then(({courses}) => {
          setCourses(courses);
        })
        .catch(() => {
          if (USE_MOCKS === true) {
            setCourses(coursesMock.courses);
          }
        });
    }
  }, [token, courses]);

  return courses;
}