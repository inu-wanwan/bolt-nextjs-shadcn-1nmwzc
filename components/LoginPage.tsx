'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Lock, UserCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isEmployee, setIsEmployee] = useState(true);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, implement proper authentication
    if (isEmployee) {
      router.push('/employee-dashboard');
    } else {
      router.push('/employer-dashboard');
    }
    toast.success(`Logged in as ${isEmployee ? 'Employee' : 'Employer'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 p-8 rounded-xl backdrop-blur-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue to your dashboard</p>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={isEmployee ? "default" : "outline"}
            className="flex-1"
            onClick={() => setIsEmployee(true)}
          >
            Employee
          </Button>
          <Button
            variant={!isEmployee ? "default" : "outline"}
            className="flex-1"
            onClick={() => setIsEmployee(false)}
          >
            Employer
          </Button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Forgot your password?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Reset it here
          </a>
        </p>
      </Card>
    </div>
  );
}