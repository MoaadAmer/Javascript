export function loadData(key) {
  return localStorage.getItem(key);
}
export function saveData(key, value) {
  localStorage.setItem(key, value);
}
