import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ShieldAlert } from 'lucide-react';

const AdminButton = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <Button
        onClick={handleAdminClick}
        variant="outline"
        size="icon"
        title="Admin Portal"
        className="rounded-full w-12 h-12 bg-black/80 border-elsol-sage text-elsol-sage hover:bg-elsol-sage hover:text-black backdrop-blur-sm shadow-xl hover-lift hover-glow transition-all"
      >
        <ShieldAlert className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default AdminButton;
