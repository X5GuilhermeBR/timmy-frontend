export interface AuthContextProps {
    authenticated: boolean;
    logout: () => void
    login: (user: string, password: string) => boolean;
    checkAuth:() => void
}

export interface AuthProviderProps {
    children: React.ReactElement | React.ReactNode
}