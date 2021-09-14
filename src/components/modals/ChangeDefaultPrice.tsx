import { useState } from 'react';
import { Dispatch } from 'redux';
import { Modal, Form, Input, Button, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DefaultPrice } from '../../models/price';
import { DefaultPriceAction } from '../../store/types/defaultPrice';
import { RootState } from '../../store/reducers';

interface ChangeDefaultPriceProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    defaultPrice: DefaultPrice,
    changeDefaultPrice: (defaultPrice: DefaultPrice) 
    => (dispatch: Dispatch<DefaultPriceAction>, getState: () => RootState) => Promise<void>,
}

const ChangeDefaultPrice = ({ visible, setVisible, defaultPrice, changeDefaultPrice }: ChangeDefaultPriceProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = (values: { [key: string]: string }) => {
        const newDefaultPrice: DefaultPrice = {
            default_price: +values.default_price,
        };
        setConfirmLoading(true);
        changeDefaultPrice(newDefaultPrice);
        setConfirmLoading(false);
        notification.open({
            message: 'Success',
            description: 'Default price was successfully changed!',
            icon: <ExclamationCircleOutlined style={{ color: '#108ee9' }} />,
        });
        setVisible(false);
    };

    const handleCancel = () => setVisible(false);

    const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);

    return (
        <Modal
            title="Change default price"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button form="changeDefaultPriceForm" key="submit" htmlType="submit" type="primary">
                    Submit
                </Button>,
            ]}
        >
            <Form
                id="changeDefaultPriceForm"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleOk}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Default Price"
                    name="default_price"
                    initialValue={defaultPrice.default_price}
                    rules={[{ required: true, message: 'Please input default price!' }]}
                >
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChangeDefaultPrice;
