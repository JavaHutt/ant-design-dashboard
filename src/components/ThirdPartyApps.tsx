import { useState, useEffect, useCallback } from 'react';
import Highlighter from 'react-highlight-words';
import { Typography, Table, Input, Space, Button, notification } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ThirdPartyAppsButtons from './ThirdPartyAppsButtons';
import Bundle from '../models/bundle';
import useTypedSelector from '../hooks/useTypedSelector';
import useActions from '../hooks/useActions';

const { Title } = Typography;

const ThirdPartyApps: React.FC = () => {
    const { bundles, error: errorLoading } = useTypedSelector(state => state.bundle);
    const { fetchBundles, addBundle } = useActions();
    // TODO what the fuck is going on here????
    // const memoFetchBundles = useCallback(() => fetchBundles, [fetchBundles]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    let searchInput: Input | null;
    const pageSize = 15;

    const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
        confirm();
        setSearchText(selectedKeys[0].toString());
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps: (dataIndex: string) => ColumnType<Bundle> = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters!)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0] ? selectedKeys[0].toString() : '');
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex as keyof Bundle]
            ? record[dataIndex as keyof Bundle]!.toLowerCase().includes(value.toString().toLowerCase())
            : false,
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput!.select(), 100);
            }
        },
        render: (text: string) => searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text || ''}
            />
        ) : (
            text
        ),
    });

    const columns: ColumnsType<Bundle> = [
        {
            title: 'Bundle Name',
            dataIndex: 'app_name',
            key: 'bundleName',
            width: '40%',
            ...getColumnSearchProps('app_name'),
        },
        {
            title: 'URL',
            dataIndex: 'app_url',
            key: 'url',
            width: '60%',
            render: text => <a href={text} target="_blank" rel="noreferrer">{text}</a>,
        },
    ];

    const notifyError = (description: string) => {
        notification.open({
            message: 'Error loading bundles',
            description,
            icon: <ExclamationCircleOutlined style={{ color: '#108ee9' }} />,
        });
    };

    useEffect(() => {
        fetchBundles();
        if (errorLoading) notifyError(errorLoading);
    }, [errorLoading]);

    return (
        <>
            <Title level={2}>Third Party Apps</Title>
            <ThirdPartyAppsButtons bundles={bundles} addBundle={addBundle} />
            <Table dataSource={bundles} columns={columns} pagination={{ pageSize }} />
        </>
    );
};

export default ThirdPartyApps;
