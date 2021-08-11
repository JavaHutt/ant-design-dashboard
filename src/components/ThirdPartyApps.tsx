import { useState, useEffect } from 'react';
import { Typography, Table } from 'antd';
import Price from '../models/price';
import api from '../api/prices';

const { Title } = Typography;

const dataSource: Price[] = [
    {
        key: '1',
        app_name: 'com.mf.holerun.huawei',
        app_url: 'https://appgallery.cloud.huawei.com/ag/n/app/C102687919',
    },
    {
        key: '2',
        app_name: 'com.erikdevhw6.lumbercraft3d',
        app_url: 'https://appgallery.cloud.huawei.com/ag/n/app/C103947833',
    },
];

const columns = [
    { title: 'Bundle Name', dataIndex: 'app_name', key: 'bundleName' },
    { title: 'URL', dataIndex: 'app_url', key: 'url', render: (text: string) => <a href={text} target="_blank" rel="noreferrer">{text}</a> },
];

const ThirdPartyApps: React.FC = () => {
    const [data] = useState(dataSource);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await api.get('third-party-apps/urls');
                console.log(res.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchPrices();
    }, []);

    return (
        <>
            <Title level={2}>Third Party Apps</Title>
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 15 }} />
        </>
    );
};

export default ThirdPartyApps;
