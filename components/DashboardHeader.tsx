'use client';

import { Button } from "@/components/ui/button";
import { Building2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardHeader({ userType }: { userType: 'employee' | 'employer' }) {
  const router = useRouter();

  return (
    <header className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-white">
                {userType === 'employee' ? 'Employee Dashboard' : 'Employer Analytics'}
              </h1>
              <p className="text-sm text-gray-400">
                {userType === 'employee' ? 'Screen Recording Interface' : 'Team Performance Overview'}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-300 hover:text-white"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}