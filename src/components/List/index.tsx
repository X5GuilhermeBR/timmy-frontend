import './index.css'
import { List, Skeleton, Avatar } from 'antd'

interface Address {
    street: string
    city: string
    state: string
    zip_code: string
}

interface User {
    email: string
    activated: boolean
    avatar_url: string
}

interface ListItem {
    id: number
    full_name: string
    date_of_birth: string
    marital_status: string
    baptism_date: string
    is_actived: boolean
    createdAt: string
    updatedAt: string
    user_id: number
    User: User
    Addresses: Address[]
}

interface BoardProps {
    list: ListItem[]
    loading: boolean
}

const Board: React.FC<BoardProps> = ({ list, loading }) => {
    const position = 'bottom'
    const align = 'center'

    return (
        <List
            pagination={{ position, align }}
            loading={loading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <a key="list-loadmore-edit">Editar</a>,
                        <a key="list-loadmore-more">Detalhes</a>,
                    ]}
                >
                    <Skeleton avatar title={false} loading={loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.User?.avatar_url} />}
                            title={<a href="https://ant.design">{item?.full_name}</a>}
                            description={`${item?.Addresses[0]?.street}, ${item?.Addresses[0]?.city}, ${item?.Addresses[0]?.state} - ${item?.Addresses[0]?.zip_code}`}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}



export default Board
