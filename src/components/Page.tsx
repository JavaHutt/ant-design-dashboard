import { Layout, Menu } from 'antd';
import ThirdPartyApps from './ThirdPartyApps';
import styles from './Page.module.scss';

const { Header, Content, Footer } = Layout;
const menus = [
    'Weigh map',
    'Countries',
    'Affiliate articles',
    'Proxy testing',
    'Partner testing',
    'Prices',
    '3rd Party Apps',
];

const Page: React.FC = () => (
    <Layout className="layout">
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {menus.map((item, i) => <Menu.Item key={`nav${i + 1}`}>{item}</Menu.Item>)}
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <div className={styles['site-layout-content']}>
                <ThirdPartyApps />
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }} />
    </Layout>
);

export default Page;
