import { formData } from 'remix/middleware/form-data';
import { methodOverride } from 'remix/middleware/method-override';
import { render } from 'remix/middleware/render';
import { staticFiles } from 'remix/middleware/static';
import { createRouter, type RouterContext } from 'remix/router';

import controller from './actions/controller.tsx';
import tasksController from './actions/tasks/controller.tsx';
import { assets } from './assets.ts';
import { loadDatabase } from './middlewares/database.ts';
import { routes } from './routes.ts';

export const router = createRouter({
  middleware: [staticFiles('./public', { index: false }), formData(), methodOverride(), loadDatabase(), render({ assets })],
});

type AppContext = RouterContext<typeof router>;

declare module 'remix/router' {
  interface RouterTypes {
    context: AppContext;
  }
}

router.map(routes, controller);
router.map(routes.tasks, tasksController);
