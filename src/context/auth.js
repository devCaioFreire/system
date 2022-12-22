import { useState, useEffect, createContext } from 'react';
import firebase from '../service/firebaseConnection';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('SystemUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }

        loadStorage();

    }, []);

    async function signUp(name, lastName, email, password) {
        setLoadingAuth(true);

        // Cadastrando usuários
        await firebase.auth().createUserWithEmailAndPassword(email, password)

            // Caso de certo, cadastrar o usuário no banco de dados
            .then(async (value) => {

                // Adicionando os usuários no banco de dados
                let uid = value.user.uid;
                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        name: name,
                        lastName: lastName,
                        avatarUrl: null
                    })

                    // Caso os passos anteriores derem certo, vou disponibilizar os dados do usuário na minha aplicação
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            lastName: lastName,
                            email: value.user.email,
                            avatarUrl: null
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                    })
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false)
            })
    }

    function storageUser(data) {
        localStorage.setItem('SystemUser', JSON.stringify(data));
    }

    async function signIn(email, password) {
        setLoadingAuth(true)

        await firebase.auth().signInWithEmailAndPassword(email, password)

            .then(async (value) => {

                let uid = value.user.uid;

                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    name: userProfile.data().name,
                    lastName: userProfile.data().lastName,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: value.user.email
                }

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
            })
    }

    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SystemUser');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signIn, signOut, setUser, storageUser }}>
            {children}
        </AuthContext.Provider>
    )
}