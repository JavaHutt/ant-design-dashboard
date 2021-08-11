import { Table } from 'antd';
import Price from '../models/price';

const dataSource: Price[] = [
    {
        app_name: 'com.mf.holerun.huawei',
        app_url: 'https://appgallery.cloud.huawei.com/ag/n/app/C102687919',
    },
    {
        app_name: 'com.erikdevhw6.lumbercraft3d',
        app_url: 'https://appgallery.cloud.huawei.com/ag/n/app/C103947833',
    },
];

const columns = [
    { title: 'Bundle Name', dataIndex: 'app_name', key: 'bundleName' },
    { title: 'URL', dataIndex: 'app_url', key: 'url', render: (text: string) => <a href={text} target="_blank" rel="noreferrer">{text}</a> },
];

const ThirdPartyApps: React.FC = () => (
    <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 15 }} />
);

export default ThirdPartyApps;
