import type { TableRow } from 'remix/data-table';

import type { TasksTable } from './schema.ts';

export type Task = TableRow<TasksTable>;
export type NewTask = Omit<Task, 'id'>;
