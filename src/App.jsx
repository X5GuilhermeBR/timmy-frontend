import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from './contexts/AuthContext'

const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
      </Router>
    </AuthProvider>
)

export default App
