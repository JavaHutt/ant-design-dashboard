import { Space, Button, Popconfirm, notification } from 'antd';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Bundle from '../../models/bundle';
import { BundleActionTypes } from '../../store/types/bundle';

interface ThirdPartyAppsActionsProps {
    bundle: Bundle;
    deleteBundle: (id: string) => { type: BundleActionTypes; payload: string; },
}

const BundlesActions: React.FC<ThirdPartyAppsActionsProps> = ({ bundle, deleteBundle }) => {
    const handleDelete = (id: string) => {
        deleteBundle(id);
        notification.open({
            message: `${id} bundle deleted`,
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

export default BundlesActions;
