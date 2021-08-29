import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Button, Tooltip, Space } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import AddBundle from '../modals/AddBundle';
import Bundle from '../../models/bundle';
import { BundleActionTypes } from '../../store/types/bundle';

interface BundlesBarProps {
    bundles: Bundle[];
    addBundle: (bundle: Bundle) => { type: BundleActionTypes; payload: Bundle; },
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
                Add a bundle
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
