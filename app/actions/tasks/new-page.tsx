import type { Handle } from 'remix/ui';

import type { Task } from './data.ts';

import { Document } from '../document.tsx';
import { TaskForm } from './public/task-form.tsx';

type Props = {
  task: Task;
};

export function NewTaskPage(handle: Handle<Props>) {
  return () => {
    let { task } = handle.props;

    return (
      <Document title="New Task | Tasklist">
        <main>
          <TaskForm task={task} />
        </main>
      </Document>
    );
  };
}
