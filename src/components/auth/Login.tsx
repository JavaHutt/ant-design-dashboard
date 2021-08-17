import useTypedSelector from '../../hooks/useTypedSelector';
import LoginForm from './LoginForm';
import NewPasswordForm from './NewPasswordForm';

const Login: React.FC = () => {
    const { forceChangePassword } = useTypedSelector(state => state.user);

    if (forceChangePassword) {
        return <NewPasswordForm />;
    }
    return <LoginForm />;
};

export default Login;
