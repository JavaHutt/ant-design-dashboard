import { Space, Button, Popconfirm, notification } from 'antd';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Bundle from '../../models/bundle';
import { BundleActionTypes } from '../../store/types/bundle';

interface ThirdPartyAppsActionsProps {
    bundle: Bundle;
    deleteBundle: (key: string) => { type: BundleActionTypes; payload: string; },
}

const ThirdPartyAppsActions: React.FC<ThirdPartyAppsActionsProps> = ({ bundle, deleteBundle }) => {
    const handleDelete = (key: string) => {
        deleteBundle(key);
        notification.open({
            message: `${key} bundle deleted`,
            icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
        });
    };

    return (
        <Space size="middle">
            <Popconfirm
                placement="topRight"
                title="Are you sure to delete this bundle?"
                onConfirm={() => handleDelete(bundle.app_name)}
                okText="Yes"
                cancelText="No"
            >
                <Button shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
        </Space>
    );
};

export default ThirdPartyAppsActions;
