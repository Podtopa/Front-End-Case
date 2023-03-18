export const useLocalStorage = (key) => {
  const state = JSON.parse(localStorage.getItem(key));
  const setState = (value) => localStorage.setItem(key, JSON.stringify(value));

  return [state, setState];
}
