import { useState } from 'react';
import { Dispatch } from 'redux';
import { Space, Button, Popconfirm, notification } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import Bundle from '../../models/bundle';
import { BundleAction } from '../../store/types/bundle';
import { RootState } from '../../store/reducers';
import EditBundle from '../modals/EditBundle';

interface BundlesActionsProps {
    bundle: Bundle;
    error: null | string;
    updateBundle: (bundle: Bundle) => (dispatch: Dispatch<BundleAction>, getState: () => RootState) => Promise<void>;
    deleteBundle: (id: number) => (dispatch: Dispatch<BundleAction>, getState: () => RootState) => Promise<void>;
}

const BundlesActions: React.FC<BundlesActionsProps> = ({ bundle, error, updateBundle, deleteBundle }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

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
            <Button shape="circle" icon={<EditOutlined />} onClick={() => setShowUpdateModal(true)} />
            <EditBundle
                bundle={bundle}
                visible={showUpdateModal}
                setVisible={setShowUpdateModal}
                updateBundle={updateBundle}
                error={error}
            />
        </Space>
    );
};

export default BundlesActions;
