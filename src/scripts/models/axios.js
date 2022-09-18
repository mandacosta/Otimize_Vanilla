const token = localStorage.getItem("@kenzieEmpresas: token")

export const instance = axios.create({
    baseURL: `http://localhost:6278/`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
});