import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  // Fetch counts for dashboard
  const [postCount, commentCount, userCount, pendingComments] = await Promise.all([
    prisma.post.count(),
    prisma.comment.count(),
    prisma.user.count(),
    prisma.comment.count({ where: { isApproved: false } }),
  ]);

  const stats = [
    { name: 'Total Posts', value: postCount },
    { name: 'Total Comments', value: commentCount },
    { name: 'Total Users', value: userCount },
    { name: 'Pending Comments', value: pendingComments },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">{stat.name}</div>
            <div className="text-3xl font-bold mt-2">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
}