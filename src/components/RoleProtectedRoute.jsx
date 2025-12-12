import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Show loading spinner while checking authentication
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Memeriksa akses...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login page with return url
        return <Navigate to="/masuk" state={{ from: location }} replace />;
    }

    // Check if user has the required role
    const userRole = user?.role || 'student';
    console.log('RoleProtectedRoute Check:', { userRole, allowedRoles, path: location.pathname });

    if (!allowedRoles.includes(userRole)) {
        // Redirect to role-specific home page
        if (userRole === 'admin') {
            return <Navigate to="/admin/moderation" replace />;
        } else if (userRole === 'creator') {
            return <Navigate to="/creator/upload" replace />;
        } else {
            // Student trying to access creator/admin pages - redirect to home
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default RoleProtectedRoute;
