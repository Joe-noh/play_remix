export type Task = {
  id?: number;
  body: string;
  done: boolean;
};

let tasks: Task[] = [
  {
    id: 1,
    body: 'Buy some more milk.',
    done: false,
  },
  {
    id: 2,
    body: 'Read 10 pages of a book.',
    done: true,
  },
  {
    id: 3,
    body: 'Fill up the gas tank.',
    done: false,
  },
];

export async function listTasks() {
  return tasks;
}

export async function getTask(id: number) {
  return tasks.find((task) => task.id === id);
}

export async function updateTask(id: number, _values: Omit<Task, 'id'>) {
  const task = await getTask(id);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return task;
}
