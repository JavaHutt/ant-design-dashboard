import { useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { Typography, Table, Input, Space, Button, notification } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PricesButtons from './PricesBar';
import styles from './Prices.module.scss';
import { Price } from '../../models/price';
import CountryPrices from './CountryPrices';
import useActions from '../../hooks/useActions';
import useTypedSelector from '../../hooks/useTypedSelector';

const { Title, Text } = Typography;

const Prices: React.FC = () => {
    const { defaultPrice, error: errorLoading } = useTypedSelector(state => state.defaultPrice);
    const { fetchDefaultPrice } = useActions();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const pageSize = 15;

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

    const getColumnSearchProps: (dataIndex: string) => ColumnType<Price> = dataIndex => ({
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
        onFilter: (value, record) => record[dataIndex as keyof Price]
            ? record[dataIndex as keyof Price]!.toString().toLowerCase().includes(value.toString().toLowerCase())
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

    const rowExpandable = (record: Price) => record.price_for_app_by_country
        ? record.price_for_app_by_country.length > 0
        : false;

    const expandedRowRender = (record: Price) => <CountryPrices data={record.price_for_app_by_country!} />;

    const columns: ColumnsType<Price> = [
        {
            title: 'Bundle Name',
            dataIndex: 'app_name',
            key: 'appName',
            width: '70%',
            ...getColumnSearchProps('app_name'),
        },
        {
            title: 'Price',
            dataIndex: 'price_for_app',
            key: 'priceForApp',
            width: '30%',
            sorter: (a, b) => a.price_for_app - b.price_for_app,
        },
    ];

    const notifyError = (description: string) => {
        notification.open({
            message: 'Error loading',
            description,
            icon: <ExclamationCircleOutlined style={{ color: '#108ee9' }} />,
        });
    };

    useEffect(() => {
        fetchDefaultPrice();
        if (errorLoading) notifyError(errorLoading);
    }, [errorLoading]);

    return (
        <>
            <Title level={2}>Third Party Apps Prices</Title>
            {!errorLoading && (
                <Text className={styles.footer}>
                    Note: for all other apps the price is <i>{defaultPrice}</i>
                </Text>
            )}
        </>
    );
};

export default Prices;
