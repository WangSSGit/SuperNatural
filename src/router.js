/**
 * Created by admin on 2017/5/16.
 */
import React from 'react';
import HomeLayout from './layouts/HomeLayout';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

export default ({history, app}) => {
  const routes = [
    {
      path: '/',
      indexRoute: {
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/LoginPage'));
          });
        },
      },
      childRoutes: [
        {
          component: HomeLayout,
          childRoutes: [
            {
              path: 'home',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  cb(null, require('./routes/HomePage'));
                });
              },
            },
            {
              path: 'book/add',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/users'));
                  registerModel(app, require('./models/books'));
                  cb(null, require('./routes/BookAddPage'));
                });
              },
            },
            {
              path: 'book/list',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/users'));
                  registerModel(app, require('./models/books'));
                  cb(null, require('./routes/BookListPage'));
                });
              },
            },
            {
              path: 'book/edit',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/users'));
                  registerModel(app, require('./models/books'));
                  cb(null, require('./routes/BookEditPage'));
                });
              },
            },
            {
              path: 'user/add',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/users'));
                  cb(null, require('./routes/UserAddPage'));
                });
              },
            },
            {
              path: 'user/edit',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/users'));
                  cb(null, require('./routes/UserEditPage'));
                });
              },
            },
            {
              path: 'user/list',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/users'));
                  cb(null, require('./routes/UserListPage'));
                });
              },
            },
          ],
        },
      ],
    },
  ];

  return <Router history={history} routes={routes}/>;
};
