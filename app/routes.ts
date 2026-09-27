import { get, resources, route } from 'remix/routes';

export const routes = route({
  assets: get('/assets/*path'),
  home: get('/'),
  tasks: resources('/tasks', { exclude: ['show'] }),
});
