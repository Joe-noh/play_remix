import { column as c, table, type TableRow } from 'remix/data-table';

export const tasksTable = table({
  name: 'tasks',
  columns: {
    id: c.integer().primaryKey().autoIncrement(),
    body: c.text().notNull(),
    done: c.integer().notNull().default(0),
  },
});

export type Task = TableRow<typeof tasksTable>;
