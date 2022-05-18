import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export const PrivateRouter = ({ children }) => {
    const { login } = useAuth()
    let location = useLocation();
    return login ? children : < Navigate to="/login" state={{ from: location }} replace />
}