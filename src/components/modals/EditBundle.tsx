import { useState } from 'react';
import { Dispatch } from 'redux';
import { Modal, Form, Input, Button, notification } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import Bundle from '../../models/bundle';
import { BundleAction } from '../../store/types/bundle';
import { RootState } from '../../store/reducers';

interface EditBundleProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    bundle: Bundle;
    error: null | string;
    updateBundle: (bundle: Bundle) => (dispatch: Dispatch<BundleAction>, getState: () => RootState) => Promise<void>;
}

const EditBundle = ({ visible, setVisible, bundle, updateBundle, error }: EditBundleProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    const handleOk = async (values: { [key: string]: string }) => {
        const { app_name, app_url } = values;
        const { id } = bundle;

        const newBundle: Bundle = {
            id,
            app_name,
            app_url,
        };
        setConfirmLoading(true);
        await updateBundle(newBundle);
        setConfirmLoading(false);
        // TODO error is empty on first unsuccessful request, but on second and onward it's ok.. what the fuck
        console.log('error: ', error);
        if (!error) {
            setVisible(false);
            notification.open({
                message: `${app_name} bundle updated`,
                icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
            });
        }
    };

    const handleCancel = () => setVisible(false);

    const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);

    return (
        <Modal
            title="Edit Bundle"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button form="updateForm" key="submit" htmlType="submit" type="primary" loading={confirmLoading}>
                    Submit
                </Button>,
            ]}
        >
            <Form
                id="updateForm"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleOk}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Bundle Name"
                    name="app_name"
                    initialValue={bundle.app_name}
                    rules={[{ required: true, message: 'Please input bundle name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="URL"
                    name="app_url"
                    initialValue={bundle.app_url}
                    rules={[{ required: true, message: 'Please input URL!', pattern: urlRegex }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditBundle;
