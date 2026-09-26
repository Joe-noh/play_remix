import type { Handle } from 'remix/ui';

import type { Task } from './data.ts';

import { routes } from '../../routes.ts';
import { Document } from '../document.tsx';
import { TaskForm } from './public/task-form.tsx';

type Props = {
  task: Task;
};

export function EditTaskPage(handle: Handle<Props>) {
  return () => {
    let { task } = handle.props;

    return (
      <Document title="Edit Task | Tasklist">
        <main>
          <TaskForm task={task} />
        </main>
        <form action={routes.tasks.destroy.href({ id: task.id! })} method="POST">
          <input type="hidden" name="_method" value="DELETE" />
          <button type="submit">Delete</button>
        </form>
      </Document>
    );
  };
}
