
import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../context/auth';
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

export default function Header() {

    const { user } = useContext(AuthContext);

    return (
        <div className="sidebar">

            <div className='image'>
                <img src={user.avatarUrl == null ? avatar : user.avatarUrl} alt={avatar} />
            </div>

            <Link to={'/dashboard'}>
                <FiHome color='#fff' size={24} />
                Chamados
            </Link>
            <Link to={'/customers'}>
                <FiUser color='#fff' size={24} />
                Clientes
            </Link>
            <Link to={'/profile'}>
                <FiSettings color='#fff' size={24} />
                Configuração
            </Link>

        </div>
    )
}