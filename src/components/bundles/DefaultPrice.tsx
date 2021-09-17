import { Typography, Spin } from 'antd';
import { DefaultPrice } from '../../models/price';
import styles from './Bundles.module.scss';

const { Text } = Typography;

interface DefaultPriceProps {
    defaultPrice: DefaultPrice;
    loadingDefaultPrice: boolean;
}

const DefaultPriceComponent: React.FC<DefaultPriceProps> = ({ defaultPrice, loadingDefaultPrice }) => {
    return (
        <>
            {loadingDefaultPrice
                ? <Spin />
                : (
                    <Text className={styles.footer}>
                        Note: current default price is {defaultPrice.default_price}
                    </Text>
                )}
        </>
    );
};

export default DefaultPriceComponent;
