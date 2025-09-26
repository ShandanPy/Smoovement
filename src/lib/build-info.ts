import packageJson from '../../package.json';

export interface BuildInfo {
  nodeEnv: string;
  appVersion: string;
  buildTime: string;
}

export function getBuildInfo(): BuildInfo {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    appVersion: packageJson.version,
    buildTime: new Date().toISOString(),
  };
}
