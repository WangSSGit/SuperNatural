/**
 * Created by admin on 2017/5/16.
 */
import {Router} from 'dva/router';
import App from './routes/App';
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import BookAddPage from './routes/BookAddPage';
import BookListPage from './routes/BookListPage';
import UserListPage from './routes/UserListPage';
import UserAddPage from './routes/UserAddPage';

export default ({history}) => {
    const routes = [
        {
            path: '/',
            component: App,
            indexRoute: {component: LoginPage},
            childRoutes: [
                {
                    path: 'login',
                    component: LoginPage
                },
                {
                    component: HomeLayout,
                    childRoutes: [
                        {
                            path: 'home',
                            component: HomePage
                        },
                        {
                            path: 'book',
                            childRoutes: [
                                {
                                    path: 'add',
                                    component: BookAddPage
                                },
                                {
                                    path: 'list',
                                    component: BookListPage
                                }
                            ]
                        },
                        {
                            path: 'user',
                            childRoutes: [
                                {
                                    path: 'add',
                                    component: UserAddPage
                                },
                                {
                                    path: 'list',
                                    component: UserListPage
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    return <Router history={history} routes={routes}/>;
}