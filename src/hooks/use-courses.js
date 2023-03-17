import {useEffect, useState} from "react";
import {API_PREFIX, USE_MOCKS} from "../const";
import {useToken} from "./use-token";
import coursesMock from "../mocks/courses.json";

export function useCourses () {
  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = useToken();

  useEffect(() => {
    if (token && !courses?.length) {
      fetch(`${API_PREFIX}/core/preview-courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => {
          return response.json();
        })
        .then(({courses, message}) => {
          if (message) {
            setError(message);
            return;
          }

          setCourses(courses);
        })
        .catch((error) => {
          if (USE_MOCKS === true) {
            setCourses(coursesMock.courses);
          }

          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token, courses]);

  return [courses, isLoading, error];
}