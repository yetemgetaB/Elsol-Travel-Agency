import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Config/firebaseConfig';
import Loading from './Loading';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check real-time Firebase Auth session
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          // Check local session
          const localAuth = localStorage.getItem('isLoggedIn') === 'true';
          setIsAuthenticated(localAuth);
        }
      });
      return () => unsubscribe();
    } catch {
      const localAuth = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(localAuth);
    }
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
