import { Divider, Table } from 'antd';
import { CountryPrice } from '../../models/price';

const CountryPrices = ({ data }: { data: CountryPrice[] }) => {
    const columns = [
        { title: 'Country', dataIndex: 'country', key: 'country', width: '70%' },
        { title: 'Price', dataIndex: 'price', key: 'price', width: '70%' },
    ];
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Divider />
        </>
    );
};

export default CountryPrices;
