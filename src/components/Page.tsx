import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import ThirdPartyApps from './third-party-apps/ThirdPartyApps';
import Prices from './Prices';
import styles from './Page.module.scss';

const { Header, Content, Footer } = Layout;

const Page: React.FC = () => (
    <Router>
        <Layout className="layout">
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">
                        <span>Prices</span>
                        <Link to="/prices" />
                    </Menu.Item>
                    <Menu.Item key="2">
                        <span>3rd Party Apps</span>
                        <Link to="/third-party-apps" />
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className={styles['site-layout-content']}>
                    <Route path="/prices" component={Prices} />
                    <Route path="/third-party-apps" component={ThirdPartyApps} />
                    <Route exact path="/">
                        <Redirect to="/third-party-apps" />
                    </Route>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }} />
        </Layout>
    </Router>
);

export default Page;
