import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import Header from "../../components/Header";

export default function Dashboard() {

    const { SignOut } = useContext(AuthContext);

    function handleSignOut() {
        SignOut()
    }

    return (
        <div>
            <Header />
            <h1>DASHBOARD</h1>
            <button onClick={handleSignOut}>SAIR</button>
        </div>
    )
}