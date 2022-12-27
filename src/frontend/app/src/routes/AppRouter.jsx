import { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import { Login } from '../pages/Login/Login'
import { Register } from '../pages/Register/Register'
import { Alterar } from '../pages/Alterar/Alterar'
import { Posts } from '../pages/Posts/Posts'
import { NotFound } from '../pages/NotFound/NotFound'


export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' exact element={<Login />} />
                <Route path='/register' exact element={<Register />} />
                <Route path='/alterar' exact element={<Alterar />} />
                <Route path='/post' exact element={<Posts/>} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    )
}