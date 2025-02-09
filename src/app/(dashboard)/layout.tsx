'use client'
import '@ant-design/v5-patch-for-react-19';
import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  CameraOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Header, Content } from "antd/es/layout/layout";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const items = [
    { key: 'laporan', icon: <FilePdfOutlined />, label: <Link href="/">Laporan</Link>, },
    { key: 'sites', icon: <HomeOutlined />, label: <Link href="/sites">Site</Link> },
    { key: 'stations', icon: <EnvironmentOutlined />, label: <Link href='/stations'>Station & Area</Link> },
    { key: 'shifts', icon: <ClockCircleOutlined />, label: <Link href='/shifts'>Shift</Link> },
    { key: 'inspection-templates', icon: <FileTextOutlined />, label: <Link href='/inspection-templates'>Template Inspeksi</Link> },
    { key: 'users', icon: <UserOutlined />, label: <Link href='/users'>User</Link> },
    { key: 'captures', icon: <CameraOutlined />, label: <Link href='/captures'>Captures</Link> },
  ]

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['laporan']}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <strong>SISTEM PATROLI PT. UNGARAN SARI GARMENTS</strong>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Content>
      </Layout>
    </Layout>
  );
}
