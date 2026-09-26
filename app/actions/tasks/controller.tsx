import * as s from 'remix/data-schema';
import * as coerce from 'remix/data-schema/coerce';
import * as f from 'remix/data-schema/form-data';
import { redirect } from 'remix/response/redirect';
import { createController } from 'remix/router';

import { databaseContext } from '../../middlewares/database.ts';
import { routes } from '../../routes.ts';
import { listTasks, getTask, createTask, updateTask, destroyTask } from './data.ts';
import { EditTaskPage } from './edit-page.tsx';
import { TasksPage } from './index-page.tsx';
import { NewTaskPage } from './new-page.tsx';

const taskFormSchema = f.object({
  body: f.field(s.string()),
  done: f.field(s.defaulted(coerce.number(), 0)),
});

export default createController(routes.tasks, {
  actions: {
    async index({ get, render }) {
      const tasks = await listTasks(get(databaseContext));

      return render(<TasksPage tasks={tasks} />);
    },

    new({ render }) {
      const task = {
        body: '',
        done: 0,
      };

      return render(<NewTaskPage task={task} />);
    },

    async create({ get, formData }) {
      const parsed = s.parseSafe(taskFormSchema, formData);

      if (parsed.success) {
        await createTask(get(databaseContext), parsed.value);
      }

      return redirect(routes.tasks.index.href(), 303);
    },

    async edit({ get, params, render }) {
      const task = await getTask(get(databaseContext), +params.id);

      if (task) {
        return render(<EditTaskPage task={task} />);
      } else {
        return new Response('Not Found.', { status: 404 });
      }
    },

    async update({ get, params, formData }) {
      const parsed = s.parseSafe(taskFormSchema, formData);

      if (parsed.success) {
        await updateTask(get(databaseContext), +params.id, parsed.value);
      }

      return redirect(routes.tasks.index.href(), 303);
    },

    async destroy({ get, params }) {
      await destroyTask(get(databaseContext), +params.id);

      return redirect(routes.tasks.index.href(), 303);
    },
  },
});
