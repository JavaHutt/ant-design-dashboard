import useTypedSelector from '../../hooks/useTypedSelector';
import useActions from '../../hooks/useActions';
import LoginForm from './LoginForm';
import NewPasswordForm from './NewPasswordForm';

const Login: React.FC = () => {
    const { user, error, forceChangePassword, loading } = useTypedSelector(state => state.user);
    const { userLogin, userError, userChangePassword } = useActions();

    return forceChangePassword
        ? (
            <NewPasswordForm
                user={user!}
                loading={loading}
                error={error}
                userError={userError}
                userChangePassword={userChangePassword}
            />
        ) : (
            <LoginForm
                loading={loading}
                error={error}
                userLogin={userLogin}
            />
        );
};

export default Login;
