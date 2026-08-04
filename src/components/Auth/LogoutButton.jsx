import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../UI/Button';

export default function LogoutButton() {
  const { logout } = useAuth();
  return <Button onClick={() => logout()}>Logout</Button>;
}
