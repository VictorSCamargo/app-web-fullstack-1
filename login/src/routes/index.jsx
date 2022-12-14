import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Alterar } from '../pages/Alterar'

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' exact element={<Login />} />
                <Route path='/register' exact element={<Register />} />
                <Route path='/alterar' exact element={<Alterar />} />
            </Routes>
        </Router>
    )
}