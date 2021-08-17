import useTypedSelector from '../../hooks/useTypedSelector';
import useActions from '../../hooks/useActions';
import LoginForm from './LoginForm';
import NewPasswordForm from './NewPasswordForm';

const Login: React.FC = () => {
    const { user, error, forceChangePassword } = useTypedSelector(state => state.user);
    const { userLogin, userError, userChangePassword } = useActions();

    return forceChangePassword
        ? (
            <NewPasswordForm
                user={user!}
                error={error}
                userError={userError}
                userChangePassword={userChangePassword}
            />
        ) : (
            <LoginForm
                error={error}
                userLogin={userLogin}
            />
        );
};

export default Login;
