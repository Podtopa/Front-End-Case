import {useEffect, useState} from "react";
import {API_PREFIX, USE_MOCKS} from "../const";
import {useToken} from "./use-token";
import courseMock from "../mocks/course.json";

export function useCourse(id) {
  const [course, setCourse] = useState();
  const token = useToken();

  useEffect(() => {
    if (token && !course) {
      fetch(`${API_PREFIX}/core/preview-courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((course) => {
          setCourse(course);
        })
        .catch(() => {
          if (USE_MOCKS === true) {
            setCourse(courseMock);
          }
        });
    }
  }, [token, course]);

  return course;
}