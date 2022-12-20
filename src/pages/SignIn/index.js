import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import { AuthContext } from "../../context/auth";
import './signIn.css';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { signIn } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        if (email && password !== '') {
            signIn(email, password);
            navigate('/dashboard')
        }
    }

    return (
        <div className="container">
            <div className="login">
                <div className="logo">
                    <img src={logo} alt={logo} />
                </div>

                <form onSubmit={handleSubmit}>
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
                    <button type={"submit"}>Acessar</button>
                </form>
                <Link to={'/register'}>Criar uma conta</Link>
            </div>
        </div>
    );
}
