import { CreateResourceResult } from '../create-resource-result.type';
import { User } from '../../users/entities/user.entity';
import { DEFAULT_RESOURCE, menu } from '../adminjs.module';
import { Components } from '../components';

export const UsersResource = (): CreateResourceResult<typeof User> => ({
  resource: User,
  ...DEFAULT_RESOURCE,
  options: {
    ...DEFAULT_RESOURCE.options,
    parent: menu.users,
    listProperties: [
      'email',
      'id',
      'balance',
      'createdAt',
      'firstName',
      'lastName',
      'role',
    ],
    editProperties: ['email', 'balance', 'firstName', 'lastName', 'password'],
    actions: {
      ...DEFAULT_RESOURCE.options.actions,
      topUp: {
        actionType: 'record',
        component: Components.UserTopup,
        handler: (request, response, context) => {
          const { record, currentAdmin } = context;
          return {
            record: record.toJSON(currentAdmin),
            msg: 'Hello world',
          };
        },
      },
      new: {
        isVisible: true,
      },
    },
  },
});
