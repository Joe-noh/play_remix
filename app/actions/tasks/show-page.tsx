import type { Handle } from 'remix/ui';

import { Document } from '../document.tsx';
import type { Task } from './data.ts';

type Props = {
  task: Task;
};

export function TaskPage(handle: Handle<Props>) {
  return () => {
    return (
      <Document title="Task | Tasklist">
        <main>
          <h1>{handle.props.task.body}</h1>
        </main>
      </Document>
    );
  };
}
