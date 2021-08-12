import { useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { Typography, Table, Input, Space, Button } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Bundle from '../models/bundle';
import api from '../api/bundle';
import AddBundle from './modals/AddBundle';

const { Title } = Typography;

const dataSource: Array<Bundle> = [
    {
        key: '1',
        app_name: '312321',
        app_url: 'https://appgallery.cloud.huawei.com/ag/n/app/C102687919',
    },
    {
        key: '2',
        app_name: '123213213',
        app_url: 'https://appgallery.cloud.huawei.com/ag/n/app/C103947833',
    },
];

const Prices: React.FC = () => {
    const [data, setData] = useState(dataSource);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    let searchInput: Input | null;

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
            ...getColumnSearchProps('app_name'),
        },
        {
            title: 'URL',
            dataIndex: 'app_url',
            key: 'url',
            render: text => <a href={text} target="_blank" rel="noreferrer">{text}</a>,
        },
    ];

    const handleAdd = () => setShowAddModal(true);

    useEffect(() => {
        const fetchBundles = async () => {
            try {
                const res = await api.get<Bundle[]>('third-party-apps/urls');
                setData(res.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchBundles();
    }, []);

    return (
        <>
            <Title level={2}>Third Party Apps Prices</Title>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, display: 'block' }}>
                Add a bundle
            </Button>
            <AddBundle
                visible={showAddModal}
                setVisible={setShowAddModal}
                data={data}
                setData={setData}
            />
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 15 }} />
        </>
    );
};

export default Prices;
