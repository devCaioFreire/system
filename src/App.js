import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/auth';
import RoutesApp from './routes';
// import firebase from '../src/service/firebaseConnection';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
        <RoutesApp />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
