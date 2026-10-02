import type { Handle } from 'remix/component';
import type { NewTask } from 'schema';

import { Document } from '../document.tsx';
import { TaskForm } from './public/task-form.tsx';

type Props = {
  task: NewTask;
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
