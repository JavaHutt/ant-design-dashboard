import { useState } from 'react';
import { Dispatch } from 'redux';
import { CSVLink } from 'react-csv';
import { Button, Tooltip, Space } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import AddBundle from '../modals/AddBundle';
import Bundle from '../../models/bundle';
import { BundleAction } from '../../store/types/bundle';
import { RootState } from '../../store/reducers';

interface BundlesBarProps {
    bundles: Bundle[];
    addBundle: (bundle: Bundle) => (dispatch: Dispatch<BundleAction>, getState: () => RootState) => Promise<void>;
}

interface BundleHeaders {
    label: string;
    key: keyof Bundle;
}

const BundlesBar: React.FC<BundlesBarProps> = ({ bundles, addBundle }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const csvHeaders: BundleHeaders[] = [
        { label: 'Bundle Name', key: 'app_name' },
        { label: 'URL', key: 'app_url' },
    ];

    const handleAdd = () => setShowAddModal(true);

    return (
        <Space style={{ marginBottom: 16, display: 'flex' }}>
            <Button onClick={handleAdd} type="primary">
                Add bundle
            </Button>
            <CSVLink data={bundles} headers={csvHeaders} filename="third_party_apps.csv">
                <Tooltip title="Download CSV">
                    <Button shape="circle" icon={<FileExcelOutlined />} />
                </Tooltip>
            </CSVLink>
            <AddBundle
                visible={showAddModal}
                setVisible={setShowAddModal}
                addBundle={addBundle}
            />
        </Space>
    );
};

export default BundlesBar;
