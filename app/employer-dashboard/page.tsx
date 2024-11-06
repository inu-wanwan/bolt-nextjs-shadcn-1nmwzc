import { EmployerDashboard } from "@/components/EmployerDashboard";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function EmployerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <DashboardHeader userType="employer" />
      <EmployerDashboard />
    </div>
  );
}