export interface Address {
    street: string
    city: string
    state: string
    zip_code: string
  }
  
  export interface User {
    email: string
    activated: boolean
    avatar_url: string
  }
  
  export interface ListItem {
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