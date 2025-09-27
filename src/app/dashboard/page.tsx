import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome back, {session.user?.email}! Here&apos;s your personalized
          overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
            <CardDescription>
              Your latest League of Legends matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No matches tracked yet. Connect your Riot account to start
              tracking your games.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Champion Performance</CardTitle>
            <CardDescription>Your top performing champions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Start rating champions to see your preferences here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Your overall performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Matches:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Win Rate:</span>
                <span>--</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Favorite Role:</span>
                <span>--</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with Smoovement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Connect Riot Account</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Link your League of Legends account to start tracking matches
                </p>
                <button className="text-sm text-primary hover:underline">
                  Coming Soon
                </button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Rate Champions</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tell us about your champion preferences
                </p>
                <button className="text-sm text-primary hover:underline">
                  Coming Soon
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
