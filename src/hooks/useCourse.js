import {useEffect, useState} from "react";
import {API_PREFIX, USE_MOCKS} from "../const";
import {useToken} from "./useToken";
import courseMock from "../mocks/course.json";

export function useCourse(id) {
  const [course, setCourse] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = useToken();

  useEffect(() => {
    if (id && token && !course) {
      fetch(`${API_PREFIX}/core/preview-courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.message) {
            setError(data.message);
            return;
          }

          setCourse(data);
        })
        .catch((error) => {
          if (USE_MOCKS === true) {
            setCourse(courseMock);
          }

          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, token, course]);

  return [course, isLoading, error];
}