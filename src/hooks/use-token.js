import React, {useEffect, useState} from "react";
import {API_PREFIX} from "../const";

export function useToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!token) {
      fetch(`${API_PREFIX}/auth/anonymous?platform=subscriptions`)
        .then((response) => {
          console.log(response)

          return response.json();
        })
        .then(({token}) => {
          setToken(token);
        });
    }
  }, []);

  return token;
}