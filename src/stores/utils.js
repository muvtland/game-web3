const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const removeLocalStorage = (key, value) => window.localStorage.removeItem(key);

const myFetch = async (path, method = 'GET', token, body) => {
    try {
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        }
        if (token){
            headers['Authorization'] = `Bearer ${token}`
        }
        const bodyData = body ? JSON.stringify(body) : null;
        // const response = await fetch(`${SERVER_URL}${path}`, {
        const response = await fetch(`http://localhost:3030${path}`, {
            method,
            headers,
            body: bodyData,
        });
        const data = await response.json();
        if (data.error){
            throw data.error;
        }
        return data;
    }catch (e) {
        throw e;
    }
}



export { getLocalStorage, setLocalStorage, removeLocalStorage, myFetch };
