import { Dispatch } from 'redux';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import LoginValues from '../../models/user';
import { UserAction } from '../../store/types/user';
import styles from './Login.module.scss';
import useActions from '../../hooks/useActions';
import useTypedSelector from '../../hooks/useTypedSelector';

interface onFinishValues {
    username: string;
    password: string;
}

interface LoginFormProps {
    error: any;
    userLogin: ({ username, password }: LoginValues) => (dispatch: Dispatch<UserAction>) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ error, userLogin }) => {
    const onFinish = (values: onFinishValues) => {
        userLogin(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.container}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {error && <Alert style={{ marginBottom: '20px' }} message={error.message} type="error" />}
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
