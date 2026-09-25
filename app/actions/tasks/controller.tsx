import { createController } from 'remix/router';
import { routes } from '../../routes.ts';
import { listTasks, getTask } from './data.ts';
import { TasksPage } from './index-page.tsx';
import { TaskPage } from './show-page.tsx';

export default createController(routes.tasks, {
  actions: {
    async index(context) {
      const tasks = await listTasks();

      return context.render(<TasksPage tasks={tasks} />);
    },

    async show(context) {
      const task = await getTask(+context.params.id);

      if (task) {
        return context.render(<TaskPage task={task} />);
      } else {
        return new Response('Not Found.', { status: 404 });
      }
    },

    new(_context) {
      return new Response('Not implemented.', { status: 501 });
    },

    create(_context) {
      return new Response('Not implemented.', { status: 501 });
    },

    edit(_context) {
      return new Response('Not implemented.', { status: 501 });
    },

    update(_context) {
      return new Response('Not implemented.', { status: 501 });
    },

    destroy(_context) {
      return new Response('Not implemented.', { status: 501 });
    },
  },
});
