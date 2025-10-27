import { Navigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

interface PrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isConnected } = useAccount()

    if (!isConnected) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

export default PrivateRoute

