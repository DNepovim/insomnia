/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import { NextPage } from "next"
import "antd/dist/antd.css"
import { Avatar, Button, Layout, Menu, message, Space, Tooltip } from "antd"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, logout, login } from "../firebase/auth"
import { Spinner } from "./components/Spinner/Spinner"
import { Centered } from "./components/Centered/Centered"
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons"
import { Content } from "antd/lib/layout/layout"
import { css } from "@emotion/react"
import FileOutlined from "@ant-design/icons/lib/icons/FileOutlined"
import TeamOutlined from "@ant-design/icons/lib/icons/TeamOutlined"
import BarsOutlined from "@ant-design/icons/lib/icons/BarsOutlined"
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined"
import FireOutlined from "@ant-design/icons/lib/icons/FireOutlined"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { PageEditPage } from "./pages/PageEditPage/PageEditPage"
import { PagesListPage } from "./pages/PagesListPage/PagesListPage"
import { UsersListPage } from "./pages/UsersListPage/UsersListPage"
import { NavigationPage } from "./pages/NavigationPage/NavigationPage"
import { SettingsPage } from "./pages/SettingsPage/SettingsPage"
import { IdTokenResult, ParsedToken } from "@firebase/auth"
import { PROJECT } from "../projects"
import Image from "next/image"

type DeployStatus = string

export const Admin: NextPage = () => {
  const [user, loading] = useAuthState(auth)
  const [userClaims, setUserClaims] = useState<ParsedToken>()
  const [deployStatus, setDeployStatus] = useState<DeployStatus>("NOT")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const deploy = async () => {
    setDeployStatus("STARTED")
    try {
      const createResult = await fetch("/api/deployment/create")
      const createResultJson = await createResult.json()
      if (createResultJson.error) {
        message.error("Něco se pokazilo.")
        console.error(createResultJson.error)
      }

      const interval = setInterval(async () => {
        const result = await fetch(`/api/deployment/${createResultJson.id}`)
        const resultJson = await result.json()
        if (
          resultJson.status === "READY" &&
          resultJson.checksState === "completed"
        ) {
          clearInterval(interval)
          setDeployStatus("NOT")
          if (resultJson.checksConclusion !== "succeeded") {
            message.success("Něco se pokazilo.")
          } else {
            message.success("Změny byly úspěšně publikovány.")
          }
        } else {
          setDeployStatus(
            `${
              resultJson.status !== "READY"
                ? resultJson.status
                : `Checks: ${resultJson.checksState}`
            } (${Math.floor((+new Date() - resultJson.createdAt) / 1000)} s)`
          )
        }
      }, 1000)

      setTimeout(() => {
        clearInterval(interval)
        setDeployStatus("NOT")
        message.error("Publikování selhalo (timeout).")
        console.error("Deploy failed (timeout).")
      }, 1000 * 60 * 5)
    } catch (e) {
      message.error("Něco se pokazilo.")
      console.error(e)
    }
  }

  useEffect(() => {
    if (user) {
      user
        .getIdTokenResult(true)
        .then((result: IdTokenResult) => setUserClaims(result.claims))
    }
  }, [user])

  if (loading) {
    return <Spinner />
  }

  if (!user) {
    return (
      <Centered
        css={css`
          background-color: #eee;
          height: 100vh;
        `}
      >
        <Button
          css={css`
            box-shadow: 1px 1px 1px #bbb;
          `}
          onClick={login}
          icon={<LoginOutlined />}
        >
          Přihlásit se
        </Button>
      </Centered>
    )
  }

  if (
    !(userClaims && ["admin", "editor"].includes(userClaims.role as string))
  ) {
    return (
      <Centered>
        Nemáte oprávnění
        <Button onClick={login} icon={<LogoutOutlined />}>
          Odhlásit se
        </Button>
      </Centered>
    )
  }

  return (
    <Layout
      css={css`
        min-height: 100vh;
      `}
    >
      <Layout>
        <BrowserRouter>
          <Layout.Sider
            collapsible
            collapsed={isSidebarCollapsed}
            onCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            width={200}
            css={css`
              position: fixed;
              left: 0;
              height: 100vh;
              overflow: auto;
              background-color: white;
              .ant-layout-sider-children {
                display: flex;
                flex-direction: column;
              }
              .ant-layout-sider-trigger {
                background-color: white;

                svg {
                  color: black;
                }
              }
            `}
          >
            <Link
              to="/admin"
              css={css`
                display: flex;
                align-items: center;
                padding: 16px 9px 4px;
              `}
            >
              <figure
                css={css`
                  height: 50px;
                  width: 50px;
                  margin-right: 8px;
                `}
              >
                <Image
                  src={`/${PROJECT}/images/logo.webp`}
                  alt=""
                  width={50}
                  height={50}
                  layout="responsive"
                />
              </figure>
              {!isSidebarCollapsed && (
                <h1
                  css={css`
                    font-size: 24px;
                  `}
                >
                  Insomnia
                </h1>
              )}
            </Link>
            <Menu>
              <Menu.Item icon={<FileOutlined />} key="pages">
                <Link to="/admin/stranky/">Stránky</Link>
              </Menu.Item>
              {userClaims.role === "admin" && (
                <Menu.Item icon={<TeamOutlined />} key="users">
                  <Link to="/admin/uzivatele">Uživatelé</Link>
                </Menu.Item>
              )}
            </Menu>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 16px 16px;
                margin: auto 0 0;
              `}
            >
              {isSidebarCollapsed ? (
                <Space
                  direction="vertical"
                  css={css`
                    margin: 0 auto;
                  `}
                >
                  <Avatar alt={user.displayName} src={user.photoURL} />
                  <Button
                    onClick={logout}
                    type="link"
                    css={css`
                      height: 24px;
                      padding: 0;
                      text-align: right;
                      margin-right: -2px;
                    `}
                    icon={<LogoutOutlined />}
                  />
                </Space>
              ) : (
                <>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      justify-content: flex-end;
                    `}
                  >
                    {user.displayName}
                    <Button
                      onClick={logout}
                      type="link"
                      css={css`
                        height: 24px;
                        padding: 0;
                        text-align: right;
                        margin-right: -2px;
                      `}
                    >
                      Odhlásit
                      <LogoutOutlined />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Layout.Sider>
          <Layout
            css={css`
              margin-left: ${isSidebarCollapsed ? 80 : 200}px;
            `}
          >
            <Content>
              <Routes>
                <Route path="/admin/stranky" element={<PagesListPage />} />
                <Route
                  path="/admin/stranky/:slug"
                  element={<PageEditPage user={user} />}
                />
                <Route path="/admin/navigace" element={<NavigationPage />} />
                <Route path="/admin/uzivatele" element={<UsersListPage />} />
                <Route path="/admin/nastaveni" element={<SettingsPage />} />
              </Routes>
            </Content>
          </Layout>
        </BrowserRouter>
      </Layout>
    </Layout>
  )
}
