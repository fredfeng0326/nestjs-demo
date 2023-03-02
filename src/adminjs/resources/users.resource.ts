import { CreateResourceResult } from '../create-resource-result.type';
import { User } from '../../users/entities/user.entity';
import { DEFAULT_RESOURCE, menu } from '../adminjs.module';

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
      new: {
        isVisible: true,
      },
    },
  },
});
