import { Table } from 'antd';
import { CountryPrice } from '../models/price';

const CountryPrices = ({ data }: {data: CountryPrice[]}) => {
    const columns = [
        { title: 'Country', dataIndex: 'country', key: 'country' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
    ];
    return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default CountryPrices;
