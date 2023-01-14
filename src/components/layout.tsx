import {Breadcrumb, Layout, Menu, MenuProps, theme} from "antd";
import {ReactNode, useState, Key} from "react";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: ReactNode,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', '1'),
];

export default function PageLayout({ children }: any) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <img src="/logo.png" style={{ height: 70, margin: 16}} alt="GRM Digital" hidden={collapsed}/>
                    <div style={{ height: 10, margin: 16}} hidden={!collapsed}/>
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        items={items}
                    />
                </Layout.Sider>
                <Layout className="site-layout">
                    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
                        <Layout.Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>Rank</Breadcrumb.Item>
                            </Breadcrumb>
                        </Layout.Content>
                    </Layout.Header>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        { children }
                    </div>
                </Layout>
            </Layout>

    )
}