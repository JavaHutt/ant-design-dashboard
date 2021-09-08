import { Dispatch } from 'redux';
import { Space, Button, Popconfirm, notification } from 'antd';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Bundle from '../../models/bundle';
import { BundleAction } from '../../store/types/bundle';
import { RootState } from '../../store/reducers';

interface ThirdPartyAppsActionsProps {
    bundle: Bundle;
    deleteBundle: (id: number) => (dispatch: Dispatch<BundleAction>, getState: () => RootState) => Promise<void>;
}

const BundlesActions: React.FC<ThirdPartyAppsActionsProps> = ({ bundle, deleteBundle }) => {
    const handleDelete = (id: number, appName: string) => {
        deleteBundle(id);
        notification.open({
            message: `${appName} bundle deleted`,
            icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
        });
    };

    return (
        <Space size="middle">
            <Popconfirm
                placement="topRight"
                title="Are you sure to delete this bundle?"
                onConfirm={() => handleDelete(bundle.id!, bundle.app_name)}
                okText="Yes"
                cancelText="No"
            >
                <Button shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
        </Space>
    );
};

export default BundlesActions;
