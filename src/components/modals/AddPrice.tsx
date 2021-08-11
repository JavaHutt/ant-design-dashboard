import { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Price from '../../models/price';

interface AddPriceProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    data: Price[],
    setData: React.Dispatch<React.SetStateAction<Price[]>>,
}

const AddPrice = ({ visible, setVisible, data, setData }: AddPriceProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    const handleOk = (price: Price) => {
        setData([...data, price]);
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="Add Bundle"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button form="addForm" key="submit" htmlType="submit" type="primary">
                    Submit
                </Button>,
            ]}
        >
            <Form
                id="addForm"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleOk}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Bundle Name"
                    name="app_name"
                    rules={[{ required: true, message: 'Please input bundle name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="URL"
                    name="app_url"
                    rules={[{ required: true, message: 'Please input URL!', pattern: urlRegex }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddPrice;
