import { Space } from 'antd';
import useTypedSelector from '../../hooks/useTypedSelector';
import useActions from '../../hooks/useActions';

const MenuProfile: React.FC = () => {
    const { user } = useTypedSelector(state => state.user);
    const { userLogout } = useActions();

    const getUserEmail = () => {
        const payload = user!.getSignInUserSession()?.getIdToken().decodePayload();
        return payload && payload.email;
    };

    const handleLogout = () => userLogout(user!);

    return (
        <div>
            <Space>
                <span style={{ color: 'white' }}>{getUserEmail()}</span>
                <a href="#" onClick={handleLogout}>Logout</a>
            </Space>
        </div>
    );
};

export default MenuProfile;
