/**
 * Created by admin on 2017/5/16.
 */
import {Router} from 'dva/router';
import App from './routes/App';
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';

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
                    path: 'home',
                    component: HomePage
                }
            ]
        }
    ];

    return <Router history={history} routes={routes}/>;
}