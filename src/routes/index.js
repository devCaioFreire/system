import { Routes, Route } from 'react-router-dom';
import Private from './Private';

// Pages
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

export default function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/dashboard' element={<Private> <Dashboard /> </Private>} />
        </Routes>
    )
}