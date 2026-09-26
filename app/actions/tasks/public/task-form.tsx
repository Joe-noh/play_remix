import type { Handle } from 'remix/ui';

import { clientEntry } from 'remix/ui';

import type { Task } from '../data.ts';

import { routes } from '../../../routes.ts';

type Props = {
  task: Task;
};

export const TaskForm = clientEntry(import.meta.url, function TaskForm(handle: Handle<Props>) {
  return () => {
    const { task } = handle.props;
    const action = task.id ? routes.tasks.update.href({ id: task.id }) : routes.tasks.create.href();
    const method = task.id ? 'PUT' : 'POST';

    return (
      <form action={action} method="POST">
        {method !== 'POST' && <input type="hidden" name="_method" value={method} />}
        <div>
          <input defaultValue={task.body} type="text" name="body" required></input>
        </div>
        <div>
          <label>
            <input defaultChecked={task.done} value="true" type="checkbox" name="done"></input>
            Done
          </label>
        </div>

        <button type="submit">Save</button>
      </form>
    );
  };
});
