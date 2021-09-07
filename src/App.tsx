import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { firstLogin } from './store/actions/userAction';
import Login from './components/auth/Login';
import Page from './components/Page';
import './App.css';

const mapStateToProps = (state: RootState) => ({ userState: state.user });

const mapDispatchToProps = {
    firstLogin,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type AppProps = StateProps & DispatchProps;

const App: React.FC<AppProps> = props => {
    const { userState } = props;
    const { isLoggedIn, user } = userState;
    const { firstLogin } = props;

    useEffect(() => {
        firstLogin(user);
    }, []);

    return (
        <div className="app">
            {isLoggedIn ? <Page /> : <Login />}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
