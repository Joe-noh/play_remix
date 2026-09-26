import * as path from 'node:path';
import { loadConfig } from 'remix/cli';
import { loadMigrations } from 'remix/data-table/migrations/node';
import { createSqliteDatabase } from 'remix/data-table/sqlite';

const config = await loadConfig(import.meta.dirname);

if (config.db?.adapter.type !== 'sqlite') throw new Error('Missing sqlite configuration');

const { adapter, migrations } = config.db;
const f = adapter.filename as { env: string; default: string };

const filename = process.env.NODE_ENV === 'test' ? ':memory:' : (process.env[f.env] ?? path.join(import.meta.dirname, '..', f.default));

export const db = createSqliteDatabase({ filename, foreignKeys: adapter.foreignKeys });

export function loadAppMigrations() {
  return loadMigrations(path.join(import.meta.dirname, '..', migrations?.directory!));
}
