import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import MenuProfile from './auth/MenuProfile';
import Bundles from './bundles/Bundles';
import styles from './Page.module.scss';

const { Header, Content, Footer } = Layout;

const Page: React.FC = () => (
    <Router>
        <Layout className="layout">
            <Header className={styles.header}>
                <Menu className={styles.menu} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">
                        <span>Bundles</span>
                        <Link to="/bundles" />
                    </Menu.Item>
                </Menu>
                <MenuProfile />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className={styles['site-layout-content']}>
                    <Route path="/bundles" component={Bundles} />
                    <Route exact path="/">
                        <Redirect to="/bundles" />
                    </Route>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }} />
        </Layout>
    </Router>
);

export default Page;
