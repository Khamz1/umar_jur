import { Route, Routes } from "react-router-dom"
import { Login, FullPost, Registration, AddPost, Home } from "../pages"
import Layout from "./Layout"
import { Jurs } from "../pages/Jurs/index.jsx"
import { ContactLawyerForm } from "../pages/Contact/index.jsx"


const routesList = [
    { key: "home", path: "/", Page: Home },
    { key: "login", path: "/login", Page: Login },
    { key: "Registration", path: "/registration", Page: Registration },
    { key: "AddPost", path: "/posts/create", Page: AddPost },
    { key: "FullPost", path: "/posts/:id", Page: FullPost },
    {key:"Jurs", path:'/jurs', Page:Jurs},
    {key:"Contact", path:'/contact', Page:ContactLawyerForm}
]
export const Routing = () => (

    <Routes>
        <Route path="/" element={<Layout />}>
            {routesList.map(({ key, path, Page }) => {
                return (
                    <Route
                        key={key}
                        path={path}
                        element={<Page />}
                    />
                )
            })}
        </Route>
    </Routes>
)