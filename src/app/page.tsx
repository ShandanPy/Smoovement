import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { getBuildInfo } from '@/lib/build-info';

export default async function Home() {
  const session = await getServerSession();
  const buildInfo = getBuildInfo();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-h1 font-bold mb-4">Welcome to Smoovement</h1>
        <p className="text-muted-foreground text-lg">
          A Next.js application with Tailwind CSS and email magic-link
          authentication
        </p>
      </div>

      {session ? (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Hello, {session.user?.email}!</CardTitle>
              <CardDescription>
                You&apos;re successfully signed in. Here&apos;s your profile
                information:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">
                    User ID:
                  </span>
                  <p className="font-mono">
                    {(session.user as any)?.id || 'unknown'}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Email:
                  </span>
                  <p>{session.user?.email}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Test Protected API</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Try accessing the protected API endpoint:
                </p>
                <code className="block p-3 bg-muted rounded-md text-sm">
                  curl -i http://localhost:3000/api/protected
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Sign in with your email to access your personalized dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/signin">
                <Button size="lg" className="w-full sm:w-auto">
                  Sign in with Email
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Build Information</CardTitle>
            <CardDescription>Current application build details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">
                  Environment:
                </span>
                <p className="font-mono">{buildInfo.nodeEnv}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  App Version:
                </span>
                <p className="font-mono">{buildInfo.appVersion}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Build Time:
                </span>
                <p className="font-mono">{buildInfo.buildTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Explore the application features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/health"
                className="group rounded-lg border border-transparent p-4 transition-colors hover:border-border hover:bg-accent"
              >
                <h3 className="font-semibold mb-2">
                  Health Check{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Check application health status and system information
                </p>
              </Link>

              <Link
                href="/signin"
                className="group rounded-lg border border-transparent p-4 transition-colors hover:border-border hover:bg-accent"
              >
                <h3 className="font-semibold mb-2">
                  Authentication{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sign in with email magic-link authentication
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
