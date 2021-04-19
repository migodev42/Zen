// import React from 'react';
// import logo from './logo.svg';
import './App.less';
import { Breadcrumb, Button, Card, Layout, Menu } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import withCardstyle from 'components/withCardStyle'
import DragableCardList from 'components/DragableCardList'
import { useState } from 'react';

const StyleCard = withCardstyle(Card);
const LayoutStyle = { height: '100vh' }
function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={LayoutStyle}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout hasSider style={{ flexGrow: 1 }}>
        <Sider width={200} className="site-layout-background"
          collapsible collapsedWidth={80} theme='light'
          onCollapse={(collapsed) => setCollapsed(collapsed)}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            inlineCollapsed={collapsed}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              display: 'flex'
            }}
          >
            <DragableCardList items={'Lorem ipsum dolor sit'.split(' ')} />
            
            {/* <StyleCard title="title">
              Content
            </StyleCard>

            <StyleCard title="title">
              Content
            </StyleCard> */}


          </Content>

        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
