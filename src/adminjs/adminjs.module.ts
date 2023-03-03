import { AdminModule } from '@adminjs/nestjs';
import { Module } from '@nestjs/common';
import AdminJS, { ResourceOptions } from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { UsersResource } from './resources/users.resource';
import { AdminsModule } from '../admins/admins.module';
import { componentLoader } from './components';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

export const menu = {
  users: { name: 'users' },
  reports: { name: 'reports' },
  history: { name: 'history' },
  others: { name: 'others' },
};

export const DEFAULT_RESOURCE = {
  options: {
    actions: {
      edit: {
        isAccessible: false,
      },
      delete: {
        isAccessible: false,
      },
      new: {
        isAccessible: false,
      },
      bulkDelete: {
        isAccessible: false,
      },
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc' as ResourceOptions['sort']['direction'],
    },
  },
};

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    AdminModule.createAdminAsync({
      imports: [AdminsModule],
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [UsersResource()],
          componentLoader,
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
  ],
})
export class AdminjsModule {}
