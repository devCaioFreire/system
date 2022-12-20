
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
            <div>
                <span>header: </span>
            </div>
        </div>
    )
}