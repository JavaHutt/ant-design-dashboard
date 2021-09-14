import { useState } from 'react';
import { Dispatch } from 'redux';
import { Typography, Spin } from 'antd';
import { DefaultPrice } from '../../models/price';
import { RootState } from '../../store/reducers';
import { DefaultPriceAction } from '../../store/types/defaultPrice';
import styles from './Bundles.module.scss';
import ChangeDefaultPrice from '../modals/ChangeDefaultPrice';

const { Text } = Typography;

interface DefaultPriceProps {
    defaultPrice: DefaultPrice;
    loadingDefaultPrice: boolean;
    changeDefaultPrice: (defaultPrice: DefaultPrice) => (dispatch: Dispatch<DefaultPriceAction>, getState: () => RootState) => Promise<void>;
}

const DefaultPriceComponent: React.FC<DefaultPriceProps> = ({ defaultPrice, loadingDefaultPrice, changeDefaultPrice }) => {
    const [showChangeDefaultPriceModal, setShowChangeDefaultPriceModal] = useState(false);

    return (
        <>
            {loadingDefaultPrice
                ? <Spin />
                : (
                    <Text className={styles.footer}>
                        Note: current default price is {defaultPrice.default_price}&nbsp;
                        <button
                            type="button"
                            className={styles['change-default-price-link']}
                            onClick={() => setShowChangeDefaultPriceModal(true)}
                        >
                            change...
                        </button>
                    </Text>
                )}
            <ChangeDefaultPrice
                visible={showChangeDefaultPriceModal}
                setVisible={setShowChangeDefaultPriceModal}
                defaultPrice={defaultPrice}
                changeDefaultPrice={changeDefaultPrice}
            />
        </>
    );
};

export default DefaultPriceComponent;
