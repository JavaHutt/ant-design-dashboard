import { CSVLink } from 'react-csv';
import { Button, Tooltip, Space } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { Price } from '../../models/price';

interface PricesButtonsProps {
    prices: Price[];
}

interface PriceHeaders {
    label: string;
    key: string;
}

const PricesButtons: React.FC<PricesButtonsProps> = ({ prices }) => {
    const csvHeaders: PriceHeaders[] = [
        { label: 'Bundle Name', key: 'app_name' },
        { label: 'Country', key: 'price_for_app_by_country.country' },
        { label: 'Price', key: 'price_for_app' },
    ];

    const generateCSVString = (data: Price[]) => {
        const del = ',';
        let content = `Bundle Name,Country${del}Price\n`;

        data.forEach(price => {
            content += `${price.app_name}${del}${del}${price.price_for_app}\n`;
            price.price_for_app_by_country?.forEach(countryPrice => {
                content += `${price.app_name}${del}${countryPrice.country}${del}${countryPrice.price}\n`;
            });
        });

        return content;
    };

    return (
        <Space style={{ marginBottom: 16, display: 'flex' }}>
            <CSVLink data={generateCSVString(prices)} headers={csvHeaders} filename="third_party_apps_prices.csv">
                <Tooltip title="Download CSV">
                    <Button shape="circle" icon={<FileExcelOutlined />} />
                </Tooltip>
            </CSVLink>
        </Space>
    );
};

export default PricesButtons;
