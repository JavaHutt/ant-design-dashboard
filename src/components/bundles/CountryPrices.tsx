import { Divider, Table } from 'antd';
import { CountryPrice } from '../../models/price';

const CountryPrices = ({ data }: { data: CountryPrice[] }) => {
    const columns = [
        { title: 'Country', dataIndex: 'country', key: 'country', width: '70%' },
        { title: 'Price', dataIndex: 'price', key: 'price', width: '30%' },
    ];

    const pricesWithKeys = () => data.map((countryPrice, index) => (
        {
            key: index.toString(),
            ...countryPrice,
        }
    ));

    return (
        <>
            <Table rowKey={record => record.key} columns={columns} dataSource={pricesWithKeys()} pagination={false} />
            <Divider />
        </>
    );
};

export default CountryPrices;
