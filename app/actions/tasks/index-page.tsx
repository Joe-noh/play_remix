import type { Handle } from 'remix/ui';

import type { Task } from './data.ts';

import { routes } from '../../routes.ts';
import { Document } from '../document.tsx';

type Props = {
  tasks: Task[];
};

export function TasksPage(handle: Handle<Props>) {
  return () => {
    return (
      <Document title="Task | Tasklist">
        <main>
          <a href={routes.tasks.new.href()}>New Task</a>
          <ul>
            {handle.props.tasks.map((task) => (
              <li>
                <a href={routes.tasks.edit.href({ id: task.id! })}>{task.done ? <s>{task.body}</s> : task.body}</a>
              </li>
            ))}
          </ul>
        </main>
      </Document>
    );
  };
}
