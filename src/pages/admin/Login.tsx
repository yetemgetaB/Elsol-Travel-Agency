import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { toast } from '../../hooks/use-toast';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/firebaseConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Primary: Firebase Authentication (supports any admin registered in Firebase Auth)
      if (username.includes('@')) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, username.trim(), password);
          if (userCredential.user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('adminUser', userCredential.user.email || '');
            toast({
              title: "Welcome Back",
              description: "Logged in via Firebase Auth",
            });
            navigate('/admin/dashboard');
            return;
          }
        } catch (firebaseErr: any) {
          const msg = firebaseErr.code === 'auth/invalid-credential' 
            ? 'Invalid email or password' 
            : firebaseErr.message;
          toast({
            title: "Authentication Failed",
            description: msg,
            variant: "destructive"
          });
          return;
        }
      }

      // 2. Secondary: Secure environment-configured credentials (without hardcoded values in bundle)
      const configuredAdminUser = import.meta.env.VITE_ADMIN_USERNAME;
      const configuredAdminPass = import.meta.env.VITE_ADMIN_PASSWORD;

      if (configuredAdminUser && configuredAdminPass) {
        if (username.trim() === configuredAdminUser && password === configuredAdminPass) {
          localStorage.setItem('isLoggedIn', 'true');
          toast({
            title: "Access Granted",
            description: "Welcome to the ELSOL Admin Dashboard",
          });
          navigate('/admin/dashboard');
          return;
        }
      }

      // 3. Development helper (only available during local `npm run dev`)
      if (import.meta.env.DEV) {
        if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('isLoggedIn', 'true');
          toast({
            title: "Dev Mode Access",
            description: "Logged in with local dev credentials.",
          });
          navigate('/admin/dashboard');
          return;
        }
      }

      toast({
        title: "Login Failed",
        description: "Invalid admin credentials. Please use your registered admin email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel rounded-xl p-8 w-full max-w-md border border-elsol-sage/20 shadow-2xl">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-xs text-gray-400 hover:text-elsol-sage transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Website
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-elsol-sage/10 rounded-full mb-4">
            <Lock className="h-8 w-8 text-elsol-sage" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100">ELSOL Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in with your admin credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Admin Email / Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/60 border-gray-700 text-white placeholder-gray-500"
              placeholder="admin@elsoltravel.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/60 border-gray-700 text-white placeholder-gray-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-elsol-sage hover:bg-elsol-sage-light text-black font-semibold py-2.5"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                </span>
              ) : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
