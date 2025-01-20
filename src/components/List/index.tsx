import './index.css'
import { List, Skeleton, Avatar, Badge } from 'antd'

interface ListItem {
    avatar_url: string
    activated: string
    phone_number: string
    id: number
    full_name: string
    date_of_birth: string
    marital_status: string
    baptism_date: string
    is_actived: boolean
    createdAt: string
    updatedAt: string
    user_id: number
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
                        <Badge
                            className="site-badge-count-109"
                            count={item?.activated ? "Ativo" : "Desligado"}
                            style={{ backgroundColor: `${item?.activated ? "green" : "red"}` }}
                        />,
                        <a key="list-loadmore-more">Editar</a>,
                    ]}
                >
                    <Skeleton avatar title={false} loading={loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar_url} />}
                            title={<a href="https://ant.design">{item?.full_name}</a>}
                            description={item?.phone_number}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}



export default Board
