import type { Dispatched, Handle } from 'remix/ui';
import type { NewTask, Task } from 'schema';

import { clientEntry, on, navigate } from 'remix/ui';
import button from 'remix/ui/button';
import checkbox from 'remix/ui/checkbox';
import input from 'remix/ui/input';

import { routes } from '../../../routes.ts';

type Props = {
  task: Task | NewTask;
};

export const TaskForm = clientEntry(import.meta.url, function TaskForm(handle: Handle<Props>) {
  let pending = false;

  const onSubmit = async (event: Dispatched<SubmitEvent, HTMLFormElement>, signal: AbortSignal) => {
    const form = event.currentTarget;

    event.preventDefault();

    pending = true;
    handle.update();

    try {
      let response = await fetch(form.action, {
        body: new FormData(form),
        method: form.method,
        signal,
      });

      if (signal.aborted) return;

      if (response.ok) {
        await navigate(response.url, { history: 'replace' });
      } else {
        if (signal.aborted) return;

        pending = false;
        handle.update();
      }
    } catch {
      if (signal.aborted) return;

      pending = false;
      handle.update();
    }
  };

  return () => {
    const { task } = handle.props;
    const isPersisted = 'id' in task;
    const action = isPersisted ? routes.tasks.update.href({ id: task.id }) : routes.tasks.create.href();
    const method = isPersisted ? 'PUT' : 'POST';

    return (
      <form action={action} method="POST" mix={on('submit', onSubmit)}>
        <input type="hidden" name="_method" value={method} />
        <div>
          <input defaultValue={task.body} type="text" name="body" required mix={input()}></input>
        </div>
        <div>
          <label>
            <input defaultChecked={task.done === 1} value={1} type="checkbox" name="done" mix={checkbox()}></input>
            Done
          </label>
        </div>

        <button type="submit" disabled={pending} mix={button()}>
          Save
        </button>
      </form>
    );
  };
});
