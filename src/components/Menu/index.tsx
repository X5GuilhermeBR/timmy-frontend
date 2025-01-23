import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
    HomeOutlined,
    PieChartOutlined,
    ReadOutlined,
    TagOutlined,
    TeamOutlined,
} from "@ant-design/icons"
import { Menu } from "antd"

const Navigation: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedKey, setSelectedKey] = useState<string>("1")

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setSelectedKey("1")
                break
            case "/membresia":
                setSelectedKey("3")
                break
            default:
                setSelectedKey("")
                break
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
            ]}
        />
    )
}

export default Navigation
