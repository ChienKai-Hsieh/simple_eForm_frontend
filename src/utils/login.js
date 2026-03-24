import axios from "axios";

const userRequest = axios.create({
    baseURL: 'https://localhost:5001',
    headers: { 'Content-Type': 'application/json' }
});

export const login = (account, password) => {
    return userRequest.post("/api/login/jwtLogin",
    {
        'username': account,
        'email': password
    }).then((res) => res.data).catch((err)=>err);
};
