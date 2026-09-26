import { createAssetServer } from 'remix/assets';
import { loadConfig } from 'remix/cli';
import { uiHmr } from 'remix/ui-hmr/assets';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const isDevelopment = nodeEnv === 'development';
const isHmr = Boolean(isDevelopment && process.env.REMIX_NODE_HMR);

const config = await loadConfig(import.meta.dirname);
if (config.assets === undefined) throw new Error('Missing assets configuration');

export const assets = createAssetServer({
  ...config.assets,
  sourceMaps: isDevelopment ? 'external' : undefined,
  minify: !isDevelopment,
  fingerprint: !isDevelopment,
  watch: isDevelopment,
  hmr: isHmr
    ? {
        channel: async () => (await import('remix/node-hmr/runtime')).createBrowserHmrChannel(),
        moduleImporter: 'remix/multiple-import-maps-polyfill',
      }
    : undefined,
  scripts: {
    loaders: isHmr ? [uiHmr()] : undefined,
  },
});

const entry = 'app/actions/public/entry.ts';

export const scriptEntry = await assets.getScriptEntry(entry);
