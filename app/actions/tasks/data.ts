import type { NewTask } from 'schema';

import { Database } from 'remix/data-table';

import { tasksTable } from '../../data/schema.ts';

export async function listTasks(db: Database) {
  return await db.findMany(tasksTable, { orderBy: ['id', 'asc'] });
}

export async function getTask(db: Database, id: number) {
  return await db.findOne(tasksTable, { where: { id } });
}

export async function createTask(db: Database, params: NewTask) {
  return await db.create(tasksTable, params);
}

export async function updateTask(db: Database, id: number, params: NewTask) {
  return await db.update(tasksTable, id, params);
}

export async function destroyTask(db: Database, id: number) {
  return await db.delete(tasksTable, id);
}
