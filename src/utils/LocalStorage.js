function saveDataToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving data to local storage:", error);
    }
}
  
function getDataFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
      return null;
    }
}

function removeDataFromLocalStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data from local storage:", error);
    }
}

function clearLocalStorage() {
  localStorage.clear();
}
  
export { saveDataToLocalStorage, getDataFromLocalStorage, removeDataFromLocalStorage, clearLocalStorage };