import './index.css'
import { List, Skeleton, Avatar, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'

interface ListItem {
    avatar_url: string
    phone_number: string
    id: number
    full_name: string
    is_actived: boolean
}

interface BoardProps {
    list: ListItem[]
    loading: boolean
}

const Board: React.FC<BoardProps> = ({ list, loading }) => {
    const navigate = useNavigate() // Para redirecionamento

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
                            count={item?.is_actived ? 'Ativo' : 'Desligado'}
                            style={{
                                backgroundColor: `${item?.is_actived ? 'green' : 'red'}`,
                            }}
                        />,
                        <a
                            key="list-loadmore-more"
                            onClick={() => navigate(`/editar-membro/${item?.id}`)}
                        >
                            Editar
                        </a>,
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
