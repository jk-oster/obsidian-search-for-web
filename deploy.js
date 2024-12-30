import chromeWebstoreUpload from 'chrome-webstore-upload';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN; 
const EXTENSION_ID = process.env.EXTENSION_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;

if(!REFRESH_TOKEN || !EXTENSION_ID || !CLIENT_SECRET || !CLIENT_ID) {
  throw new Error('Missing environment variables');
}

export const store = chromeWebstoreUpload({
  extensionId: EXTENSION_ID,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  refreshToken: REFRESH_TOKEN
});

await store.publishExtension();
