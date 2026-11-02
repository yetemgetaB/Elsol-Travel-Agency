import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Loader2, ArrowLeft, KeyRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { auth } from '@/Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanUser = username.trim().toLowerCase();

      // 1. Primary: Firebase Authentication (supports registered admin emails)
      if (cleanUser.includes('@')) {
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
          // If invalid in Firebase, fall through to verify local/env admin credentials
          console.warn('Firebase auth attempt returned:', firebaseErr.code);
        }
      }

      // 2. Admin credentials (supports configured env variables or standard demo access)
      const validAdminUsers = [
        (import.meta.env.VITE_ADMIN_USERNAME || '').toLowerCase(),
        'admin',
        'elsol',
        'admin@elsoltravel.com'
      ].filter(Boolean);

      const validAdminPasswords = [
        import.meta.env.VITE_ADMIN_PASSWORD,
        'elsol2024',
        'admin123'
      ].filter(Boolean);

      if (validAdminUsers.includes(cleanUser) && validAdminPasswords.includes(password)) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminUser', username.trim());
        toast({
          title: "Access Granted",
          description: "Welcome to the ELSOL Admin Dashboard",
        });
        navigate('/admin/dashboard');
        return;
      }

      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use 'admin' and 'elsol2024' or your registered Firebase email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('elsol2024');
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
              placeholder="admin or admin@elsoltravel.com"
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

        {/* Demo Credentials Helper Pill */}
        <div className="mt-6 p-3 rounded-lg bg-elsol-sage/10 border border-elsol-sage/20 text-xs text-gray-300">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-elsol-sage flex items-center">
              <KeyRound className="w-3.5 h-3.5 mr-1" /> Demo Credentials:
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-elsol-sage underline hover:text-white transition-colors"
            >
              Auto Fill
            </button>
          </div>
          <p className="text-gray-400">
            Username: <code className="text-gray-200 bg-black/40 px-1 py-0.5 rounded">admin</code> | Password: <code className="text-gray-200 bg-black/40 px-1 py-0.5 rounded">elsol2024</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
