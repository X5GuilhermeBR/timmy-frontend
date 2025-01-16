import React from 'react'
import {
    HomeOutlined,
    PieChartOutlined,
    ReadOutlined,
    TagOutlined,
    TeamOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'

const Navigation: React.FC = () => {
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                    key: '1',
                    icon: <HomeOutlined />,
                    label: 'Inicio',
                },
                {
                    key: '2',
                    icon: <PieChartOutlined />,
                    label: 'Dashboard',
                    disabled: true,
                },
                {
                    key: '3',
                    icon: <TeamOutlined />,
                    label: 'Membresia',
                },
                {
                    key: '4',
                    icon: <ReadOutlined />,
                    label: 'Ensino',
                    disabled: true,
                },
                {
                    key: '5',
                    icon: <TagOutlined />,
                    label: 'Eventos',
                    disabled: true,
                },
            ]}
        />
    )
}

export default Navigation