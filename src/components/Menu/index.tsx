import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
    HomeOutlined,
    LogoutOutlined,
    PieChartOutlined,
    ReadOutlined,
    TagOutlined,
    TeamOutlined,
} from "@ant-design/icons"
import { Menu } from "antd"
import { useAuth } from "../../hooks/useAuth"

const Navigation: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedKey, setSelectedKey] = useState<string>("0")

    useEffect(() => {
        if (location.pathname === "/") {
            setSelectedKey("1")
        } else if (location.pathname === "/membresia") {
            setSelectedKey("3")
        } else if (/^\/editar-membro\/\d+$/.test(location.pathname)) {
            setSelectedKey("3")
        } else {
            setSelectedKey("")
        }
    }, [location.pathname])

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => {
                setSelectedKey(e.key)
                switch (e.key) {
                    case "1":
                        navigate("/")
                        break
                    case "3":
                        navigate("/membresia")
                        break
                    case "6":
                        logout();
                        break
                    default:
                        break
                }
            }}
            items={[
                {
                    key: "1",
                    icon: <HomeOutlined />,
                    label: "Inicio",
                },
                {
                    key: "2",
                    icon: <PieChartOutlined />,
                    label: "Dashboard",
                    disabled: true,
                },
                {
                    key: "3",
                    icon: <TeamOutlined />,
                    label: "Membresia",
                },
                {
                    key: "4",
                    icon: <ReadOutlined />,
                    label: "Ensino",
                    disabled: true,
                },
                {
                    key: "5",
                    icon: <TagOutlined />,
                    label: "Eventos",
                    disabled: true,
                },
                {
                    key: "6",
                    icon: <LogoutOutlined />,
                    label: "Sair",
                },
            ]}
        />
    )
}

export default Navigation
