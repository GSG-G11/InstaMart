import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

function ProtectedRoute({ redirectPath = '/', children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>loading...</p>;
  if (!user || !user.isAdmin) {
    return <Navigate to={redirectPath} />;
  }
  return children;
}
ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProtectedRoute;
