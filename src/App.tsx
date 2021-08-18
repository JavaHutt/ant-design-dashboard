import { useEffect } from 'react';
import useTypedSelector from './hooks/useTypedSelector';
import useActions from './hooks/useActions';
import Login from './components/auth/Login';
import Page from './components/Page';
import './App.css';

const App = () => {
    const { isLoggedIn, user } = useTypedSelector(state => state.user);
    const { firstLogin } = useActions();

    useEffect(() => {
        firstLogin(user);
    }, []);

    return (
        <div className="app">
            {isLoggedIn ? <Page /> : <Login />}
        </div>
    );
};

export default App;
