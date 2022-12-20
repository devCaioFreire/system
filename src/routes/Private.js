import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from '../service/firebaseConnection';

export default function Private({ children }) {

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        async function checkLogin() {
            const unsub = firebase.auth().onAuthStateChanged((user) => {

                // Se tiver usuário logado
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem('@detailUser', JSON.stringify(userData))
                    setLoading(false);
                    setSigned(true);
                }

                // Se não tiver usuário logado
                else {
                    localStorage.removeItem('@detailUser')
                    setLoading(false)
                    setSigned(false)
                }
            })
        }

        checkLogin();

    }, [])

    if (loading) {
        return <div><h1>Carregando</h1></div>
    }

    if (!signed) {
        return navigate('/')
    }

    return children;
}