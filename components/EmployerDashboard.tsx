'use client';

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

// Mock data with detailed activity breakdown
const employeeData = [
  { 
    name: 'John Doe',
    activities: {
      coding: 4.2,
      meetings: 2.1,
      documentation: 1.5,
      breaks: 0.8,
      email: 0.6
    },
    productivity: 85,
    focusScore: 78,
    taskCompletion: 92
  },
  { 
    name: 'Jane Smith',
    activities: {
      coding: 5.1,
      meetings: 1.2,
      documentation: 1.8,
      breaks: 0.5,
      email: 0.4
    },
    productivity: 92,
    focusScore: 88,
    taskCompletion: 95
  },
  // Add more employees...
];

// Transform data for different chart types
const activityData = employeeData.map(emp => ({
  name: emp.name,
  coding: emp.activities.coding,
  meetings: emp.activities.meetings,
  documentation: emp.activities.documentation,
  email: emp.activities.email,
  breaks: emp.activities.breaks,
}));

const productivityTrend = [
  { day: 'Mon', avgProductivity: 87, avgFocus: 82 },
  { day: 'Tue', avgProductivity: 85, avgFocus: 84 },
  { day: 'Wed', avgProductivity: 89, avgFocus: 86 },
  { day: 'Thu', avgProductivity: 92, avgFocus: 88 },
  { day: 'Fri', avgProductivity: 86, avgFocus: 83 },
];

const ACTIVITY_COLORS = {
  coding: '#3B82F6',
  meetings: '#10B981',
  documentation: '#6366F1',
  email: '#F59E0B',
  breaks: '#EF4444'
};

const CustomXAxis = (props: any) => (
  <XAxis {...props} stroke="#9CA3AF" />
);

const CustomYAxis = (props: any) => (
  <YAxis {...props} stroke="#9CA3AF" />
);

export function EmployerDashboard() {
  const calculateTeamAverages = () => {
    const totalEmployees = employeeData.length;
    return {
      productivity: employeeData.reduce((acc, emp) => acc + emp.productivity, 0) / totalEmployees,
      focusScore: employeeData.reduce((acc, emp) => acc + emp.focusScore, 0) / totalEmployees,
      taskCompletion: employeeData.reduce((acc, emp) => acc + emp.taskCompletion, 0) / totalEmployees,
    };
  };

  const averages = calculateTeamAverages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Team Productivity"
          value={`${averages.productivity.toFixed(1)}%`}
          description="Based on activity analysis"
        />
        <MetricCard
          title="Average Focus Score"
          value={`${averages.focusScore.toFixed(1)}%`}
          description="Time spent on primary tasks"
        />
        <MetricCard
          title="Task Completion Rate"
          value={`${averages.taskCompletion.toFixed(1)}%`}
          description="Weekly target achievement"
        />
      </div>

      <Tabs defaultValue="activities" className="space-y-6">
        <TabsList className="bg-gray-800/50 border-gray-700">
          <TabsTrigger value="activities">Activity Breakdown</TabsTrigger>
          <TabsTrigger value="productivity">Productivity Trends</TabsTrigger>
          <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Daily Activity Distribution</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <CustomXAxis dataKey="name" />
                  <CustomYAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  {Object.entries(ACTIVITY_COLORS).map(([key, color]) => (
                    <Bar key={key} dataKey={key} fill={color} stackId="activities" />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="productivity">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weekly Productivity Trends</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <CustomXAxis dataKey="day" />
                  <CustomYAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="avgProductivity" 
                    stroke="#3B82F6" 
                    name="Productivity"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgFocus" 
                    stroke="#10B981" 
                    name="Focus Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Individual Productivity Scores</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={employeeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <CustomXAxis dataKey="name" />
                    <CustomYAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Bar dataKey="productivity" fill="#3B82F6" name="Productivity Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Focus vs Task Completion</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={employeeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <CustomXAxis dataKey="name" />
                    <CustomYAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="focusScore" fill="#6366F1" name="Focus Score" />
                    <Bar dataKey="taskCompletion" fill="#10B981" name="Task Completion" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  description 
}: { 
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-3xl font-bold text-blue-400 my-2">{value}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </Card>
  );
}