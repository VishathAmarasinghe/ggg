import React, { useEffect, useState } from "react";

import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";

import { UserRelatedNavigationPanel } from "../../Utils/LeftNavigationlist";
import InnerPageLoader from "./InnerPageLoader";
import HeaderBar from '../Components/Header';
import { logo } from "../assets";


const { Header, Content, Footer, Sider } = Layout;


const MainPageLayout = () => {
  const [openprofileeditingDrawer, setProfileOpeneditingDrawer]=useState(false)
  const [pageIndex,setPageIndex]=useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const [mobilemenu, setMobileMenu] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



  const openMobilePanel = () => {
    setMobileMenu((pre) => !pre);

  };

  const handleMenuclick=(e)=>{
    console.log("clicked e ",e.key);
    setPageIndex(e.key);
  }


 
  return (
    <div   className="flex flex-row  h-screen overflow-hidden ">
      <div className="h-[40px] mt-5 flex md:hidden z-50  border-2 ">
        <div
        
          className={`${
            mobilemenu ? "flex" : "hidden"
          } md:hidden absolute w-1/2 h-screen  mt-12`}
        >
          <Menu
          onClick={handleMenuclick}
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={UserRelatedNavigationPanel()}
          />
        </div>
      </div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <div className={`hidden md:flex`}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#86CA6E",
              },
            }}
          >
            <Sider
              theme="light"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div className="w-full my-4 flex flex-col justify-center items-center">
                <img
                  src={collapsed ? logo : logo}
                  className={collapsed ? "w-1/3" : "w-2/3"}
                  alt="logo"
                />
              </div>
              <ConfigProvider 
                theme={{
                    components:{
                        Menu:{
                            fontFamily:"inter",
                            
                            itemSelectedColor:"black",
                            itemSelectedBg:"#86CA6E",
                            
                        }
                    }
                }}
              >
              <Menu
              onClick={handleMenuclick}
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={UserRelatedNavigationPanel()}
              />
              </ConfigProvider>
            </Sider>
          </ConfigProvider>
        </div>
        <Layout className="bg-[#EBEEFF]">
          <Header
            style={{
              padding: 0,
              lineHeight:0,
              background: colorBgContainer,
            }}
          >
            <HeaderBar classMode={false}  openMobilePanel={openMobilePanel}  openprofileeditingDrawer={openprofileeditingDrawer} setProfileOpeneditingDrawer={setProfileOpeneditingDrawer}/>
          </Header>
          <Content
            style={{
              margin: "0",
              backgroundColor: "#E6FEDE",
            }}
          >
            <div
            className="h-[100%] border-t-2 border-l-2 border-[#267130]"
              style={{
                padding: 4,
                // minHeight: "100%",
                
                background: "#E6FEDE",
                borderRadius: borderRadiusLG,
              }}
            >
              
              <InnerPageLoader innerPageKey={pageIndex}/>
              
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};




export default MainPageLayout