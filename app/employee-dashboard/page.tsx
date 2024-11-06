import ScreenCapture from "@/components/ScreenCapture";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <DashboardHeader userType="employee" />
      <ScreenCapture />
    </div>
  );
}