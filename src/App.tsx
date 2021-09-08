import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { firstLogin } from './store/actions/userAction';
import Login from './components/auth/Login';
import Page from './components/Page';
import './App.css';

const mapStateToProps = (state: RootState) => ({ userState: state.user });

const mapDispatchToProps = (dispatch: Dispatch) => {
    const userActions = bindActionCreators({ firstLogin }, dispatch);
    return {
        ...userActions,
    };
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type AppProps = StateProps & DispatchProps;

const App: React.FC<AppProps> = props => {
    const { userState } = props;
    const { isLoggedIn, user } = userState;
    const { firstLogin: firstUserLogin } = props;

    useEffect(() => {
        firstUserLogin(user);
    }, []);

    return (
        <div className="app">
            {isLoggedIn ? <Page /> : <Login />}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
