import axios from "axios";

const URL = "http://localhost:4444";

export const api = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json"
    }
})