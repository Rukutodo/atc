import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.acharyatutorials.admin',
  appName: 'ATC Admin',
  webDir: 'out', // Next.js static export directory (not used in live mode but required by cap)
  server: {
    // This is the production URL the Android app will load
    url: 'https://acharyatutorials.com/admin', 
    cleartext: true
  }
};

export default config;
