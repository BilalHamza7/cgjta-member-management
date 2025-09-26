import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken'); // Or from a context/state


    if (!token) {
        // No token found, redirect to login
        return <Navigate to="/" replace />;
    }

    // Token is valid, render the children (protected component)
    return children ? children : <Outlet />;
};

export default ProtectedRoute;