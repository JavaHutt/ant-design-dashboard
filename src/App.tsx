import './App.css';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;
const menus = ['Weigh map', 'Countries', 'Affiliate articles', 'Proxy testing', 'Partner testing', 'Prices', '3rd Party Apps'];

const App = () => (
    <div className="app">
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    {menus.map((item, i) => <Menu.Item key={`abc${i + 1}`}>{item}</Menu.Item>)}
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">Content</div>
            </Content>
            <Footer style={{ textAlign: 'center' }} />
        </Layout>
    </div>
);

export default App;
