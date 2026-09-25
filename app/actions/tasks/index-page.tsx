import type { Handle } from 'remix/ui';

import { Document } from '../document.tsx';
import type { Task } from './data.ts';
import { routes } from '../../routes.ts';

type Props = {
  tasks: Task[];
};

export function TasksPage(handle: Handle<Props>) {
  return () => {
    return (
      <Document title="Task | Tasklist">
        <main>
          <ul>
            {handle.props.tasks.map((task) => (
              <li>
                <a href={routes.tasks.show.href({ id: task.id })}>{task.body}</a>
              </li>
            ))}
          </ul>
        </main>
      </Document>
    );
  };
}
