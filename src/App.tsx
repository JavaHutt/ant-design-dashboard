import useTypedSelector from './hooks/useTypedSelector';
import Login from './components/auth/Login';
import Page from './components/Page';
import './App.css';

const App = () => {
    const { isLoggedIn } = useTypedSelector(state => state.user);

    return (
        <div className="app">
            {isLoggedIn ? <Page /> : <Login />}
        </div>
    );
};

export default App;
