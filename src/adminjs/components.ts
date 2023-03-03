import { ComponentLoader } from 'adminjs';
import * as path from 'path';

const componentLoader = new ComponentLoader();

const Components = {
  UserTopup: componentLoader.add(
    'UserTopup',
    path.join(__dirname, '/component/User/TopUp'),
  ),
};

export { componentLoader, Components };
