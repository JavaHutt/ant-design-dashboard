import { useState } from 'react';
import { Dispatch } from 'redux';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserAction, UserActionTypes } from '../../store/types/user';
import styles from './Login.module.scss';

const { Text } = Typography;

interface onFinishValues {
    password: string;
    confirm: string;
}

interface NewPasswordFormProps {
    user: CognitoUser;
    error: any;
    loading: boolean;
    userError: (errorInfo: any) => {
        type: UserActionTypes;
        payload: any;
    };
    userChangePassword: (user: CognitoUser, newPassword: string) => (dispatch: Dispatch<UserAction>) => Promise<void>;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ user, error, loading, userError, userChangePassword }) => {
    const onFinish = (values: onFinishValues) => {
        userChangePassword(user, values.password);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        userError(errorInfo);
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
                <Text>Please select new password</Text>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[{ required: true, message: 'Please confirm new password!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Change password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewPasswordForm;
