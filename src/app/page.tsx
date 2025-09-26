import { getBuildInfo } from '@/lib/build-info';

export default function Home() {
  const buildInfo = getBuildInfo();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Welcome to Smoovement</h1>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Build Information</h2>
          <div className="space-y-2 text-left">
            <p>
              <strong>Environment:</strong> {buildInfo.nodeEnv}
            </p>
            <p>
              <strong>App Version:</strong> {buildInfo.appVersion}
            </p>
            <p>
              <strong>Build Time:</strong> {buildInfo.buildTime}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/health"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Health Check{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Check application health status
          </p>
        </a>
      </div>
    </main>
  );
}
