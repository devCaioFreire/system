import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import logo from '../../assets/logo.png';
import './signUp.css';

export default function SignUp() {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        if (name && lastName && email && password !== '') {
            signUp(name, lastName, email, password);
            setName('')
            setLastName('')
            setEmail('')
            setPassword('')
        }
        else {
            alert('Preencha todos os campos.')
        }
    }

    return (
        <div className="container">
            <div className="login">
                <div className="logo">
                    <img src={logo} alt={logo} />
                </div>

                <form className="form-register" onSubmit={handleSubmit}>
                    <input
                        type={"text"}
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type={"text"}
                        placeholder='Sobrenome'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type={"email"}
                        placeholder='exemplo@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type={"password"}
                        placeholder='***********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type={"submit"}>Cadastrar</button>
                </form>
                <Link to={'/'}>Já tenho uma conta</Link>
            </div>
        </div>
    );
}
