import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddProducts from './AddProducts';
import Orders from './Order';
import Header from '../../components/Header';
import All_Items from './All_Items';
import { HomeOutlined, PlusOutlined, LogoutOutlined, MenuOutlined, RetweetOutlined, FileDoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Modal, Drawer, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from '../../Contexts/AuthContext';

const { Content, Sider, Header: AntHeader, Footer } = Layout;

function getItem(label, key, icon, onClick) {
    return { key, icon, label, onClick };
}

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(true);
    const { logOut } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isSmallScreen = useMediaQuery({ query: '(max-width: 820px)' });

    const showModal = () => { setIsModalOpen(true); };
    const handleCancel = () => { setIsModalOpen(false); };
    const handleLogout = () => { logOut(); setIsModalOpen(false); };
    const closeDrawer = () => { setDrawerVisible(false); };

    const items = [
        getItem(<Link to="home" style={{ textDecoration: "none" }} onClick={closeDrawer}>Home</Link>, '1', <HomeOutlined />),
        getItem(<Link to="add-products" style={{ textDecoration: "none" }} onClick={closeDrawer}>Add Products</Link>, '2', <PlusOutlined />),
        getItem(<Link to="orders" style={{ textDecoration: "none" }} onClick={closeDrawer}>Orders</Link>, '3', <FileDoneOutlined />),
        getItem(<Link to="all-items" style={{ textDecoration: "none" }} onClick={closeDrawer}>All Items</Link>, '4', <RetweetOutlined />),
        getItem(<span onClick={() => { showModal(); closeDrawer(); }}>Logout</span>, '5', <LogoutOutlined onClick={() => { showModal(); closeDrawer(); }} />),
    ];

    const renderMenu = () => (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    );

    return (
        <>
            <Layout>
                {isSmallScreen ? (
                    <>
                        <div style={{ position: 'absolute', top: 16, left: 10, zIndex: 1000 }}>
                            <Button type="primary" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)}></Button>
                        </div>
                        <Drawer title="Sharki Brand" placement="left" onClose={() => setDrawerVisible(false)} open={drawerVisible} style={{ backgroundColor: '#001529', color: '#fff' }}>
                            {renderMenu()}
                        </Drawer>
                    </>
                ) : (
                    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                        <div className="dashboard-sider" />
                        {renderMenu()}
                    </Sider>
                )}
                <Layout>
                    <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529' }}>
                        <h2 style={{ margin: 0 }} className='text-white'>Krist</h2>
                        <Input.Search placeholder="Search by name/category" style={{ maxWidth: '250px' }} onSearch={(value) => setSearchQuery(value)} allowClear />
                    </AntHeader>
                    <Content>
                        <Routes>
                            <Route path='home' element={<Home />} />
                            <Route path='add-products' element={<AddProducts />} />
                            <Route path='orders' element={<Orders />} />
                            <Route path='all-items' element={<All_Items />} />
                        </Routes>
                    </Content>
                    <Footer style={{ textAlign: 'center', background: "#001529", color: "#fff", padding: "0" }}>
                        © {new Date().getFullYear()}. All Rights Reserved.
                    </Footer>
                </Layout>
            </Layout>

            {/* Logout Modal */}
            <Modal title="Logout Confirmation" open={isModalOpen} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="logout" type='primary' danger onClick={handleLogout}>Logout</Button>
                ]}
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
        </>
    );
}








// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Home from './Home'
// import AddProducts from './AddProducts'
// import Orders from './Order'
// import Header from '../../components/Header'
// import All_Items from './All_Items'

// export default function Dashboard() {
//   return (

//     <>
//     <Header/>
//     <Routes>
//       <Route path='home' element={<Home/>} />
//       <Route path='add-products' element={<AddProducts/>} />
//       <Route path='orders' element={<Orders/>} />
//       <Route path='all-items' element={<All_Items/>} />
//     </Routes>
  
//     </>)
// }
