import * as s from 'remix/data-schema';
import * as coerce from 'remix/data-schema/coerce';
import * as f from 'remix/data-schema/form-data';
import { redirect } from 'remix/response/redirect';
import { createController } from 'remix/router';

import { routes } from '../../routes.ts';
import { listTasks, getTask } from './data.ts';
import { EditTaskPage } from './edit-page.tsx';
import { TasksPage } from './index-page.tsx';
import { NewTaskPage } from './new-page.tsx';

const taskFormSchema = f.object({
  body: f.field(s.string()),
  done: f.field(s.defaulted(coerce.boolean(), false)),
});

export default createController(routes.tasks, {
  actions: {
    async index({ render }) {
      const tasks = await listTasks();

      return render(<TasksPage tasks={tasks} />);
    },

    new({ render }) {
      const task = {
        body: '',
        done: false,
      };

      return render(<NewTaskPage task={task} />);
    },

    create({ formData }) {
      const params = s.parseSafe(taskFormSchema, formData);

      console.log(params);

      return redirect(routes.tasks.index.href(), 303);
    },

    async edit({ params, render }) {
      const task = await getTask(+params.id);

      if (task) {
        return render(<EditTaskPage task={task} />);
      } else {
        return new Response('Not Found.', { status: 404 });
      }
    },

    update({ formData }) {
      const params = s.parseSafe(taskFormSchema, formData);

      console.log(params);

      return redirect(routes.tasks.index.href(), 303);
    },

    destroy({ params }) {
      console.log('delete', params);

      return redirect(routes.tasks.index.href(), 303);
    },
  },
});
