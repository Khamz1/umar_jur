import { api } from "./api"


// posts
export const getPosts = () => {
    return api.get("/posts")
}

export const getPostById = (id) => {
    return api.get("/posts/" + id)
}

export const createPost =  async (data) => {
    const response = await api.get('/posts');
        return response.data;
}
    
// auth
export const register = (data) => {
    return api.post("/auth/register", data)
}

export const login = (data) => {
    return api.post("/auth/login", data)
}

// export const checkAuth = () => {
//     return api.post("/auth/me")
// }